import { createContext, useState, useEffect, useCallback } from 'react';
import { baseUrl, getRequest, postRequest, postImageRequest } from '../utils/services';
import { io } from 'socket.io-client';
import moment from 'moment';

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
    // socketio 서버 접속
    const newSocket = io('http://localhost:8080');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  // 로그인 시 동작
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

  // 메시지 전송
  useEffect(() => {
    if (socket === null) return;

    const recipientId = currentChat?.members?.find((id) => id !== user?._id);

    socket.emit('sendMessage', { ...newMessage, recipientId });
    console.log('메시지 보내기', newMessage);
  }, [newMessage]);

  // text 메시지 전송하기
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

    /* 이전에는 response값을 넣었지만 response값을 사용하지 않고 
    사용자가 입력한 텍스트를 바로 emit하기 위해 (socket.emit('sendMessage'))
    사용하는 변수 (채팅방 Id, 보내는사람 Id, 콘텐츠(텍스트), 콘텐츠 타입(텍스트))
    */
    const typedMessage = {
      chatId: currentChatId,
      senderId: sender._id,
      content: textMessage,
      contentType: 'text',
      createdAt: moment().format(),
    };

    if (response.error) {
      return setSendTextMessageError(response);
    }

    setNewMessage(typedMessage);
    setMessages((prev) => [...prev, typedMessage]);
    setTextMessage('');
  }, []);

  // image 메시지 전송하기
  const sendImageMessage = useCallback(
    async (imageMessage, sender, currentChatId, setImageMessage, imageName, imageFile) => {
      const tday = new Date().valueOf();

      if (!imageMessage) return;

      const response = await postRequest(
        `${baseUrl}/messages`,
        JSON.stringify({
          chatId: currentChatId,
          senderId: sender._id,
          content: tday + imageName.replace(/\s/g, ''),
          contentType: 'image',
          imageName: imageName,
        })
      );

      /* 이전에는 response값을 넣었지만 response값을 사용하지 않고 
    사용자가 입력한 이미지를 바로 emit하기 위해 (socket.emit('sendMessage'))
    사용하는 변수 (채팅방 Id, 보내는사람 Id, 콘텐츠(이미지), 콘텐츠 타입(이미지), 이미지이름)
    */
      const typedMessage = {
        chatId: currentChatId,
        senderId: sender._id,
        content: tday + imageName.replace(/\s/g, ''),
        contentType: 'image',
        imageName: imageName,
        createdAt: moment().format(),
      };

      if (response.error) {
        return setSendImageMessageError(response);
      }

      // 이미지 업로드
      const uploaImage = async () => {
        const formData = new FormData();
        formData.append('imageFile', imageFile, response.content);

        const uploadResponse = await postImageRequest('http://localhost:5000/api/upload', formData);

        if (uploadResponse.error) {
          console.log('이미지를 업로드하는 데 실패했습니다.');
        }
      };

      uploaImage();
      setNewMessage(typedMessage);
      setMessages((prev) => [...prev, typedMessage]);
      setImageMessage('');
    },
    []
  );

  // 실시간으로 메시지 수신
  useEffect(() => {
    if (socket === null) return;

    socket.on('getMessage', (res) => {
      if (currentChat?._id !== res.chatId) return;
      setMessages((prev) => [...prev, res]);
      console.log('메시지 받기', res);
    });

    return () => {
      socket.off('getMessage');
    };
  }, [socket, currentChat]);

  // 잠재적 채팅 상대 불러오기
  useEffect(() => {
    const getUsers = async () => {
      const response = await getRequest(`${baseUrl}/users`);

      if (response.error) {
        return console.log('사용자를 불러오는 데 실패했습니다.', response);
      }

      const pChats = response.filter((u) => {
        let isChatCreated = false;

        if (user?._id === u._id) return false;

        // 사용자의 채팅방 존재 유무 확인
        if (userChats) {
          // console.log(userChats);
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

  // 사용자의 이미 생성된 채팅방 불러오기
  useEffect(() => {
    const getUserChats = async () => {
      if (user?._id) {
        setIsUserChatsLoading(true);
        setUserChatsError(null);

        const response = await getRequest(`${baseUrl}/chats/${user?._id}`);
        // console.log(response);

        setIsUserChatsLoading(false);

        if (response.error) {
          return setUserChatsError(response);
        }

        setUserChats(response);
      }
    };
    getUserChats();
  }, [user]);

  // 선택한 채팅방의 메시지 불러오기
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

  // 채팅방 선택하기
  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  // 채팅방 생성하기
  const createChat = useCallback(async (firstId, secondId) => {
    const response = await postRequest(
      `${baseUrl}/chats`,
      JSON.stringify({
        firstId,
        secondId,
      })
    );

    if (response.error) {
      return console.log('채팅을 생성하는 데 실패했습니다.', response);
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
