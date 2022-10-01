import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectUser, signUpUser, selectUserLoading } from 'redux/slices/user';
import { Loading } from 'redux/commonTypes';
import * as paths from '../paths';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => selectUser(state));
  const userLoading = useAppSelector((state) => selectUserLoading(state));
  const onSubmit = useCallback(() => {
    if (email && password) {
      dispatch(signUpUser({ email, password }));
    }
  }, [email, password, dispatch]);

  useEffect(() => {
    if (user) {
      navigate(paths.home());
    }
  }, [user, navigate]);

  return (
    <div>
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
        <button onClick={onSubmit} disabled={userLoading === Loading.pending}>
          Sign Up
        </button>
      </div>
      Already have an an account?
      <Link to={paths.logIn()}>Login</Link>
    </div>
  );
}

export default SignUp;
