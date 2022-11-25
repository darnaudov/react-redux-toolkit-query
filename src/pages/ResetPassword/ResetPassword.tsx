import { useCallback, useState } from 'react';
import { Button, Link } from '@mui/material';
import { useAppDispatch } from 'redux/hooks';
import * as paths from '../paths';
import { resetPassword } from 'redux/slices/user';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const dispatch = useAppDispatch();
  const onSubmit = useCallback(() => {
    if (email) {
      dispatch(resetPassword({ email }));
    }
  }, [email, dispatch]);

  return (
    <div>
      <h1>Reset Password</h1>
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
      <div style={{ marginTop: '10px' }}>
        <Button variant="contained" onClick={onSubmit}>
          Reset Password
        </Button>
      </div>
      <div style={{ marginTop: '10px' }}>
        <Link href={paths.logIn()}>Login</Link>
      </div>
      <div>
        <Link href={paths.signUp()}>Need an account?</Link>
      </div>
    </div>
  );
}

export default ResetPassword;
