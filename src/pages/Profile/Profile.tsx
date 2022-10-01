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
    <div>
      <div>Email: {user?.email}</div>
      <div>
        <Link to={paths.updateProfile()}>Update Profile</Link>
      </div>
      <div>
        <button onClick={onLogOut}>Log out</button>
      </div>
    </div>
  );
}

export default Profile;
