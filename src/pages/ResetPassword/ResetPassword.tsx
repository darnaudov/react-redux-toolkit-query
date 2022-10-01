import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
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
      Reset Password
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
        <button onClick={onSubmit}>Reset Password</button>
      </div>
      <div>
        <Link to={paths.logIn()}>Login</Link>
      </div>
      <div>
        <Link to={paths.signUp()}>Need an account?</Link>
      </div>
    </div>
  );
}

export default ResetPassword;
