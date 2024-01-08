import { Routes, Route, Navigate } from 'react-router-dom';
import Chat from './pages/Chat';
import Login from './pages/Login';
import HeaderNav from './components/Header';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <>
      <HeaderNav />
      <Routes>
        <Route path="/" element={user ? <Chat /> : <Login />} />
        <Route path="login" element={user ? <Chat /> : <Login />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
