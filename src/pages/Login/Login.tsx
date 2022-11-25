import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Link } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import * as paths from '../paths';
import { loginUser, selectUser, selectUserLoading } from 'redux/slices/user';
import { Loading } from 'redux/commonTypes';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => selectUser(state));
  const userLoading = useAppSelector((state) => selectUserLoading(state));
  const onSubmit = useCallback(() => {
    if (email && password) {
      dispatch(loginUser({ email, password }));
    }
  }, [email, password, dispatch]);

  useEffect(() => {
    if (user) {
      navigate(paths.home());
    }
  }, [user, navigate]);

  return (
    <div>
      <h1>Login</h1>
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
      <div style={{ marginTop: '10px' }}>
        <Button
          variant="contained"
          onClick={onSubmit}
          disabled={userLoading === Loading.pending}
        >
          Login
        </Button>
      </div>
      <div style={{ marginTop: '10px' }}>
        Don't have an account?
        <Link href={paths.signUp()} style={{ marginLeft: '5px' }}>
          Sign up
        </Link>
      </div>
      <div>
        <Link href={paths.resetPassword()}>Forgot password?</Link>
      </div>
    </div>
  );
}

export default Login;
