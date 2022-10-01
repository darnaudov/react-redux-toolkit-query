import { useCallback, useState } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { updateProfile } from 'redux/slices/user';

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
    <div>
      Update Profile
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
        <button onClick={onSubmit}>Update</button>
      </div>
    </div>
  );
}

export default UpdateProfile;
