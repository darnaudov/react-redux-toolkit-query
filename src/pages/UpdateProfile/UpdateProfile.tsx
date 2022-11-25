import { useCallback, useState } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { updateProfile } from 'redux/slices/user';
import { Button } from '@mui/material';

function UpdateProfile() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const onSubmit = useCallback(() => {
    if (email || password) {
      dispatch(updateProfile({ email, password }));
    }
  }, [email, password, dispatch]);

  return (
    <>
      <h1>Update Profile</h1>
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
        <Button variant="contained" onClick={onSubmit}>
          Update
        </Button>
      </div>
    </>
  );
}

export default UpdateProfile;
