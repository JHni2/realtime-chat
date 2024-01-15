import { Routes, Route, Navigate } from 'react-router-dom';
import Chat from './pages/Chat';
import Login from './pages/Login';
import HeaderNav from './components/Header';
import { useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';
import { useFetchConsnole } from './hooks/useFetchConsnole';

function App() {
  const { user } = useContext(AuthContext);
  const { isShowConsole } = useFetchConsnole();

  useEffect(() => {
    const originalConsole = console.log;

    if (isShowConsole || isShowConsole === null) {
      console.log = function () {};
    }

    return () => {
      console.log = originalConsole;
    };
  }, [isShowConsole]);

  return (
    <ChatContextProvider user={user}>
      <HeaderNav />
      <Routes>
        <Route path="/" element={user ? <Chat /> : <Login />} />
        <Route path="login" element={user ? <Chat /> : <Login />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ChatContextProvider>
  );
}

export default App;
