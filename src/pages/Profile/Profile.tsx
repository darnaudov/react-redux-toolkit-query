import { useCallback } from 'react';
import { Link } from 'react-router-dom';
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
        <Link to={paths.updateProfile()}>Update Profile</Link>
      </div>
      <div style={{ marginTop: '10px' }}>
        <button onClick={onLogOut}>Log out</button>
      </div>
    </>
  );
}

export default Profile;
