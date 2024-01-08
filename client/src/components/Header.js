import { Link } from 'react-router-dom';

const HeaderNav = () => {
  return (
    <header className="layout-header">
      <ul className="menu">
        <Link to="/">
          <li className="menu-item">Home</li>
        </Link>
        <Link to="login">
          <li className="menu-item">Login/out</li>
        </Link>
      </ul>
    </header>
  );
};
export default HeaderNav;
