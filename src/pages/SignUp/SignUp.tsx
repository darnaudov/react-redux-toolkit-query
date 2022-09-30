import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import * as paths from '../paths';
import { selectUser, signUpUser } from 'redux/slices/user';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => selectUser(state));

  const onSubmit = useCallback(() => {
    if (email && password) {
      dispatch(signUpUser({ email, password }));
    }
  }, [email, password, dispatch]);

  return (
    <div>
      {user ? user.email : 'not logged in'}
      Sign Up
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
        <button onClick={onSubmit}>Sign Up</button>
      </div>
      Already have an an account?
      <Link to={paths.login()}>Login</Link>
    </div>
  );
}

export default SignUp;
