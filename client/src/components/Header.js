import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const HeaderNav = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <header className="layout-header">
      <ul className="menu">
        <Link to="/">
          <li className="menu-item">Home</li>
        </Link>
        <div className="menu-item-flex">
          {user && <li className="menu-item">{user?.name} 님</li>}
          {user ? (
            <Link onClick={() => logoutUser()} to="/login">
              <li className="menu-item">Logout</li>
            </Link>
          ) : (
            <Link to="/chat">
              <li className="menu-item">Login</li>
            </Link>
          )}
        </div>
      </ul>
    </header>
  );
};
export default HeaderNav;
