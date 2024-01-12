import { createContext, useState, useEffect, useCallback } from 'react';
import { baseUrl, getRequest, postRequest } from '../utils/services';
import { io } from 'socket.io-client';

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);
  const [sendTextMessageError, setSendTextMessageError] = useState(null);
  const [sendImageMessageError, setSendImageMessageError] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const newSocket = io('http://localhost:8080');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (socket === null) return;
    socket.emit('addNewUser', user?._id);
    socket.on('getOnlineUsers', (res) => {
      setOnlineUsers(res);
    });

    return () => {
      socket.off('getOnlineUsers');
    };
  }, [socket]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await getRequest(`${baseUrl}/users`);

      if (response.error) {
        return console.log('사용자를 불러오는 데 실패했습니다.', response);
      }

      const pChats = response.filter((u) => {
        let isChatCreated = false;

        if (user?._id === u._id) return false;

        if (userChats) {
          isChatCreated = userChats?.some((chat) => {
            return chat.members[0] === u._id || chat.members[1] === u._id;
          });
        }

        return !isChatCreated;
      });

      setPotentialChats(pChats);
    };

    getUsers();
  }, [userChats]);

  useEffect(() => {
    const getUserChats = async () => {
      if (user?._id) {
        setIsUserChatsLoading(true);
        setUserChatsError(null);

        const response = await getRequest(`${baseUrl}/chats/${user?._id}`);

        setIsUserChatsLoading(false);

        if (response.error) {
          return setUserChatsError(response);
        }

        setUserChats(response);
      }
    };
    getUserChats();
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      setIsMessagesLoading(true);
      setMessagesError(null);

      const response = await getRequest(`${baseUrl}/messages/${currentChat?._id}`);

      setIsMessagesLoading(false);

      if (response.error) {
        return setMessagesError(response);
      }

      setMessages(response);
    };
    getMessages();
  }, [currentChat]);

  const sendTextMessage = useCallback(async (textMessage, sender, currentChatId, setTextMessage) => {
    if (!textMessage) return;

    const response = await postRequest(
      `${baseUrl}/messages`,
      JSON.stringify({
        chatId: currentChatId,
        senderId: sender._id,
        content: textMessage,
        contentType: 'text',
      })
    );

    if (response.error) {
      return setSendTextMessageError(response);
    }

    setNewMessage(response);
    setMessages((prev) => [...prev, response]);
    setTextMessage('');
  }, []);

  const sendImageMessage = useCallback(async (imageMessage, sender, currentChatId, setImageMessage, imageName) => {
    if (!imageMessage) return;

    console.log(imageName);

    const response = await postRequest(
      `${baseUrl}/messages`,
      JSON.stringify({
        chatId: currentChatId,
        senderId: sender._id,
        content: imageMessage,
        contentType: 'image',
        imageName: imageName,
      })
    );

    if (response.error) {
      return setSendImageMessageError(response);
    }

    setNewMessage(response);
    setMessages((prev) => [...prev, response]);
    setImageMessage('');
  }, []);

  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  const createChat = useCallback(async (firstId, secondId) => {
    const response = await postRequest(
      `${baseUrl}/chats`,
      JSON.stringify({
        firstId,
        secondId,
      })
    );

    if (response.error) {
      return console.log('채팅을 만드는 데 실패했습니다.', response);
    }

    setUserChats((prev) => [...prev, response]);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
        currentChat,
        updateCurrentChat,
        messages,
        isMessagesLoading,
        messagesError,
        sendTextMessage,
        sendImageMessage,
        onlineUsers,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
