import { Outlet } from 'react-router-dom';
import Header from 'components/Header';

function MainLayout() {
  return (
    <>
      <Header></Header>
      <section style={{ textAlign: 'center' }}>
        <Outlet></Outlet>
      </section>
    </>
  );
}

export default MainLayout;
