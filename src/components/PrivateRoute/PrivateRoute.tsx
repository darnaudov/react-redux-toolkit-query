import { PropsWithChildren } from 'react';
import { useAppSelector } from 'redux/hooks';
import { selectUser } from 'redux/slices/user';
import { Navigate } from 'react-router-dom';
import * as paths from 'pages/paths';

function PrivateRoute({ children }: PropsWithChildren) {
  const user = useAppSelector((state) => selectUser(state));

  if (user) {
    return <>{children}</>;
  } else {
    return <Navigate to={paths.logIn()}></Navigate>;
  }
}

export default PrivateRoute;
