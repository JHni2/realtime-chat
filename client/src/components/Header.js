import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const HeaderNav = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <div className="header">
      <div className="menu">
        <div className="menu-item">Home</div>
        <div>
          {user ? (
            <Link onClick={() => logoutUser()} to="/login">
              <div className="menu-item">Logout</div>
            </Link>
          ) : (
            <Link to="/chat">
              <div className="menu-item">Login</div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default HeaderNav;
