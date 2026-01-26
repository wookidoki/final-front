import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import {
  FaSearch,
  FaPaperPlane,
  FaImage,
  FaSmile,
  FaEllipsisV,
  FaMusic,
  FaPlay,
} from "react-icons/fa";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background: ${({ theme }) => theme.colors.bg};
`;

const Sidebar = styled.div`
  width: 350px;
  border-right: 2px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.surface};

  @media (max-width: 768px) {
    width: 100%;
    display: ${({ $showChat }) => ($showChat ? "none" : "flex")};
  }
`;

const SidebarHeader = styled.div`
  padding: 24px 20px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
`;

const SidebarTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 16px;
`;

const SearchBox = styled.div`
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px 12px 44px;
  background: ${({ theme }) => theme.colors.bg};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.textMain};
  font-size: 0.95rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSub};
    opacity: 0.6;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.textSub};
  font-size: 1rem;
`;

const ChatList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 12px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.bg};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 3px;
  }
`;

const ChatItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${({ $active, theme }) => ($active ? theme.colors.bg : "transparent")};
  border: 2px solid ${({ $active, theme }) => ($active ? theme.colors.primary : "transparent")};

  &:hover {
    background: ${({ theme }) => theme.colors.bg};
  }
`;

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.3rem;
  font-weight: 700;
  flex-shrink: 0;
  position: relative;
`;

const OnlineDot = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 14px;
  height: 14px;
  background: #00ff88;
  border: 3px solid ${({ theme }) => theme.colors.surface};
  border-radius: 50%;
`;

const ChatInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;

const ChatName = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMain};
`;

const ChatTime = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSub};
`;

const ChatPreview = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSub};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const UnreadBadge = styled.div`
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  background: ${({ theme }) => theme.colors.gradient};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  margin-top: 4px;
`;

const ChatArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.bg};

  @media (max-width: 768px) {
    display: ${({ $showChat }) => ($showChat ? "flex" : "none")};
  }
`;

const ChatHeader2 = styled.div`
  padding: 20px 28px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.surface};
`;

const ChatHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ChatHeaderInfo = styled.div``;

const ChatHeaderName = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 4px;
`;

const ChatHeaderStatus = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const OptionsButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.bg};
  border: 2px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMain};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const MessageArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.surface};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 3px;
  }
`;

const Message = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-end;
  flex-direction: ${({ $isOwn }) => ($isOwn ? "row-reverse" : "row")};
`;

const MessageAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.9rem;
  font-weight: 700;
  flex-shrink: 0;
`;

const MessageContent = styled.div`
  max-width: 60%;
`;

const MessageBubble = styled.div`
  padding: 12px 16px;
  background: ${({ $isOwn, theme }) =>
    $isOwn ? theme.colors.gradient : theme.colors.surface};
  color: ${({ $isOwn, theme }) => ($isOwn ? "white" : theme.colors.textMain)};
  border-radius: ${({ $isOwn }) => ($isOwn ? "16px 16px 4px 16px" : "16px 16px 16px 4px")};
  font-size: 1rem;
  line-height: 1.5;
  word-break: break-word;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const MessageTime = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSub};
  margin-top: 4px;
  text-align: ${({ $isOwn }) => ($isOwn ? "right" : "left")};
`;

const MusicShareCard = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: ${({ theme }) => theme.colors.bg};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  margin-top: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const MusicAlbumArt = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
`;

const MusicInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const MusicTitle = styled.div`
  font-size: 0.95rem;
  font-weight: 700;
  color: ${({ theme, $isOwn }) => ($isOwn ? "white" : theme.colors.textMain)};
  margin-bottom: 4px;
`;

const MusicArtist = styled.div`
  font-size: 0.85rem;
  color: ${({ theme, $isOwn }) => ($isOwn ? "rgba(255,255,255,0.8)" : theme.colors.textSub)};
`;

const PlayButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: center;

  &:hover {
    transform: scale(1.1);
  }
`;

const InputArea = styled.div`
  padding: 20px 28px;
  border-top: 2px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-end;
`;

const InputActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.bg};
  border: 2px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMain};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const InputBox = styled.div`
  flex: 1;
  position: relative;
`;

const TextArea = styled.textarea`
  width: 100%;
  max-height: 120px;
  padding: 12px 16px;
  background: ${({ theme }) => theme.colors.bg};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.textMain};
  font-size: 1rem;
  font-family: inherit;
  resize: none;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSub};
    opacity: 0.6;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.surface};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 3px;
  }
`;

const SendButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gradient};
  border: none;
  color: white;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px ${({ theme }) => theme.colors.primary}40;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px ${({ theme }) => theme.colors.primary}60;
  }

  &:active {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

// 더미 데이터
const dummyChats = [
  {
    id: 1,
    name: "음악친구 🎵",
    avatar: "🎵",
    lastMessage: "이 노래 진짜 좋더라!",
    time: "방금",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "플리 공유방",
    avatar: "🎧",
    lastMessage: "새로운 플레이리스트 만들었어요",
    time: "5분 전",
    unread: 0,
    online: true,
  },
  {
    id: 3,
    name: "K-POP Lover",
    avatar: "💜",
    lastMessage: "컴백 무대 봤어?",
    time: "1시간 전",
    unread: 5,
    online: false,
  },
  {
    id: 4,
    name: "Lo-fi 힐링방",
    avatar: "🌙",
    lastMessage: "공부할 때 듣기 좋은 곡 추천해줘",
    time: "2시간 전",
    unread: 0,
    online: true,
  },
];

const dummyMessages = [
  {
    id: 1,
    isOwn: false,
    text: "안녕! 오늘 뭐 듣고 있어?",
    time: "오후 3:24",
  },
  {
    id: 2,
    isOwn: true,
    text: "요즘 이 노래 계속 듣고 있어",
    time: "오후 3:25",
  },
  {
    id: 3,
    isOwn: true,
    musicShare: {
      title: "Neon Dreams",
      artist: "Digital Youth",
      albumArt: "https://picsum.photos/seed/music1/300/300",
    },
    time: "오후 3:25",
  },
  {
    id: 4,
    isOwn: false,
    text: "오 좋은데? 나도 들어볼게!",
    time: "오후 3:26",
  },
  {
    id: 5,
    isOwn: false,
    text: "요즘 이런 감성 음악 찾고 있었는데 딱이다 👍",
    time: "오후 3:26",
  },
];

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(dummyChats[0]);
  const [messages, setMessages] = useState(dummyMessages);
  const [inputText, setInputText] = useState("");
  const [showChat, setShowChat] = useState(false);
  const messageEndRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        isOwn: true,
        text: inputText,
        time: new Date().toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMessage]);
      setInputText("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    setShowChat(true);
  };

  return (
    <Container>
      <Sidebar $showChat={showChat}>
        <SidebarHeader>
          <SidebarTitle>메시지</SidebarTitle>
          <SearchBox>
            <SearchIcon>
              <FaSearch />
            </SearchIcon>
            <SearchInput placeholder="대화 검색..." />
          </SearchBox>
        </SidebarHeader>

        <ChatList>
          {dummyChats.map((chat) => (
            <ChatItem
              key={chat.id}
              $active={selectedChat?.id === chat.id}
              onClick={() => handleChatSelect(chat)}
            >
              <Avatar>
                {chat.avatar}
                {chat.online && <OnlineDot />}
              </Avatar>
              <ChatInfo>
                <ChatHeader>
                  <ChatName>{chat.name}</ChatName>
                  <ChatTime>{chat.time}</ChatTime>
                </ChatHeader>
                <ChatPreview>{chat.lastMessage}</ChatPreview>
                {chat.unread > 0 && <UnreadBadge>{chat.unread}</UnreadBadge>}
              </ChatInfo>
            </ChatItem>
          ))}
        </ChatList>
      </Sidebar>

      <ChatArea $showChat={showChat}>
        {selectedChat && (
          <>
            <ChatHeader2>
              <ChatHeaderLeft>
                <Avatar>
                  {selectedChat.avatar}
                  {selectedChat.online && <OnlineDot />}
                </Avatar>
                <ChatHeaderInfo>
                  <ChatHeaderName>{selectedChat.name}</ChatHeaderName>
                  <ChatHeaderStatus>
                    {selectedChat.online ? "온라인" : "오프라인"}
                  </ChatHeaderStatus>
                </ChatHeaderInfo>
              </ChatHeaderLeft>
              <OptionsButton>
                <FaEllipsisV />
              </OptionsButton>
            </ChatHeader2>

            <MessageArea>
              {messages.map((message) => (
                <Message key={message.id} $isOwn={message.isOwn}>
                  {!message.isOwn && <MessageAvatar>{selectedChat.avatar}</MessageAvatar>}
                  <MessageContent>
                    {message.text && (
                      <MessageBubble $isOwn={message.isOwn}>{message.text}</MessageBubble>
                    )}
                    {message.musicShare && (
                      <MessageBubble $isOwn={message.isOwn}>
                        <MusicShareCard>
                          <MusicAlbumArt
                            src={message.musicShare.albumArt}
                            alt={message.musicShare.title}
                          />
                          <MusicInfo>
                            <MusicTitle $isOwn={message.isOwn}>
                              {message.musicShare.title}
                            </MusicTitle>
                            <MusicArtist $isOwn={message.isOwn}>
                              {message.musicShare.artist}
                            </MusicArtist>
                          </MusicInfo>
                          <PlayButton>
                            <FaPlay />
                          </PlayButton>
                        </MusicShareCard>
                      </MessageBubble>
                    )}
                    <MessageTime $isOwn={message.isOwn}>{message.time}</MessageTime>
                  </MessageContent>
                </Message>
              ))}
              <div ref={messageEndRef} />
            </MessageArea>

            <InputArea>
              <InputWrapper>
                <InputActions>
                  <ActionButton>
                    <FaImage />
                  </ActionButton>
                  <ActionButton>
                    <FaMusic />
                  </ActionButton>
                  <ActionButton>
                    <FaSmile />
                  </ActionButton>
                </InputActions>

                <InputBox>
                  <TextArea
                    placeholder="메시지를 입력하세요..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    rows={1}
                  />
                </InputBox>

                <SendButton onClick={handleSend} disabled={!inputText.trim()}>
                  <FaPaperPlane />
                </SendButton>
              </InputWrapper>
            </InputArea>
          </>
        )}
      </ChatArea>
    </Container>
  );
};

export default Chat;
