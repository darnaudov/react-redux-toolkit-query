import { useAppSelector } from 'redux/hooks';
import { selectUser } from 'redux/slices/user';

function Home() {
  const user = useAppSelector((state) => selectUser(state));

  return (
    <>
      <h1>Home</h1>
      <div>Wellcome {user?.email}</div>
    </>
  );
}

export default Home;
