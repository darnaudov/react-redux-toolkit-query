import { Outlet } from 'react-router-dom';

function MainPublicLayout() {
  return (
    <>
      <section style={{ textAlign: 'center' }}>
        <Outlet></Outlet>
      </section>
    </>
  );
}

export default MainPublicLayout;
