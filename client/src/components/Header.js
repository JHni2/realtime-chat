import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const HeaderNav = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <div className="header">
      <div className="menu">
        <Link to="/">
          <li className="menu-item">Home</li>
        </Link>
        <div>
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
      </div>
    </div>
  );
};
export default HeaderNav;
