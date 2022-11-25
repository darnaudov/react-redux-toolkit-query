import { useCallback } from 'react';
import { Button, Link } from '@mui/material';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { selectUser, logOutUser } from 'redux/slices/user';
import * as paths from 'pages/paths';

function Profile() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => selectUser(state));
  const onLogOut = useCallback(() => {
    dispatch(logOutUser());
  }, [dispatch]);

  return (
    <>
      <h1>Profile</h1>
      <div>Email: {user?.email}</div>
      <div style={{ marginTop: '10px' }}>
        <Link href={paths.updateProfile()}>Update Profile</Link>
      </div>
      <div style={{ marginTop: '10px' }}>
        <Button variant="outlined" size="small" onClick={onLogOut}>
          Log out
        </Button>
      </div>
    </>
  );
}

export default Profile;
