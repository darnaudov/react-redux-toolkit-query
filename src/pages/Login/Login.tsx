import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'redux/hooks';
import * as paths from '../paths';
import { signUpUser } from 'redux/slices/user';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  const onSubmit = useCallback(() => {
    if (email && password) {
      dispatch(signUpUser({ email, password }));
    }
  }, [email, password, dispatch]);

  return (
    <div>
      Login
      <div>
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
      </div>
      <div>
        <button onClick={onSubmit}>Login</button>
      </div>
      Don't have an account?
      <Link to={paths.signUp()}>Sign up</Link>
    </div>
  );
}

export default Login;
