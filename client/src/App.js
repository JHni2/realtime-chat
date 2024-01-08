import { Routes, Route, Navigate } from 'react-router-dom';
import Chat from './pages/Chat';
import Login from './pages/Login';
import HeaderNav from './components/Header';

function App() {
  return (
    <>
      <HeaderNav />
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
