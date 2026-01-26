import React, { useState } from "react";
import styled from "styled-components";
import {
  FaPlay,
  FaHeart,
  FaRegHeart,
  FaComment,
  FaShare,
  FaMusic,
  FaPaperPlane,
  FaEllipsisV,
} from "react-icons/fa";
import BaseModal from "./BaseModal";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 32px;
  min-height: 500px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const VideoSection = styled.div`
  background: #000;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  aspect-ratio: 9 / 16;
  max-height: 700px;
`;

const VideoThumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlayOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.6);
  }
`;

const PlayButton = styled.button`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gradient};
  border: none;
  color: white;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 32px ${({ theme }) => theme.colors.primary}60;

  &:hover {
    transform: scale(1.1);
  }
`;

const MusicInfo = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  padding: 16px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const MusicIcon = styled.div`
  width: 48px;
  height: 48px;
  background: ${({ theme }) => theme.colors.gradient};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  flex-shrink: 0;
`;

const MusicDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

const MusicTitle = styled.div`
  font-size: 0.95rem;
  font-weight: 700;
  color: white;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const MusicArtist = styled.div`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const UserAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
  flex-shrink: 0;
`;

const UserDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

const UserName = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 4px;
`;

const PostTime = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSub};
`;

const FollowButton = styled.button`
  padding: 8px 20px;
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px ${({ theme }) => theme.colors.primary}50;
  }
`;

const Description = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textMain};
  line-height: 1.6;
`;

const Actions = styled.div`
  display: flex;
  gap: 24px;
  padding: 16px 0;
  border-top: 2px solid ${({ theme }) => theme.colors.border};
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
`;

const ActionItem = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.textSub)};
  cursor: pointer;
  transition: all 0.3s ease;

  svg {
    font-size: 1.5rem;
  }

  span {
    font-size: 0.9rem;
    font-weight: 600;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const CommentsSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CommentsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const CommentsTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.textMain};
`;

const CommentsCount = styled.span`
  color: ${({ theme }) => theme.colors.textSub};
`;

const CommentsList = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 16px;
  max-height: 300px;

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

const Comment = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
`;

const CommentAvatar = styled.div`
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

const CommentContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
`;

const CommentUser = styled.span`
  font-size: 0.95rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMain};
`;

const CommentTime = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSub};
`;

const CommentText = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textMain};
  line-height: 1.5;
  margin-bottom: 8px;
`;

const CommentActions = styled.div`
  display: flex;
  gap: 16px;
`;

const CommentAction = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSub};
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CommentInput = styled.div`
  display: flex;
  gap: 12px;
  padding-top: 16px;
  border-top: 2px solid ${({ theme }) => theme.colors.border};
`;

const Input = styled.input`
  flex: 1;
  padding: 12px 16px;
  background: ${({ theme }) => theme.colors.bg};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 24px;
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

const SendButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gradient};
  border: none;
  color: white;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;

  &:hover {
    transform: scale(1.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

// 더미 댓글 데이터
const dummyComments = [
  {
    id: 1,
    user: "음악러버",
    avatar: "🎵",
    text: "이 노래 진짜 좋네요! 매일 듣고 있어요 ❤️",
    time: "2시간 전",
    likes: 24,
  },
  {
    id: 2,
    user: "멜로디",
    avatar: "🎶",
    text: "안무도 멋있고 음악도 최고!",
    time: "5시간 전",
    likes: 15,
  },
  {
    id: 3,
    user: "뮤직헌터",
    avatar: "🎧",
    text: "플레이리스트에 바로 추가했습니다 👍",
    time: "1일 전",
    likes: 8,
  },
];

const ShortsDetailModal = ({ short, onClose }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(short.likes || 2341);
  const [comments, setComments] = useState(dummyComments);
  const [commentText, setCommentText] = useState("");

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleComment = () => {
    if (commentText.trim()) {
      const newComment = {
        id: comments.length + 1,
        user: "나",
        avatar: "👤",
        text: commentText,
        time: "방금",
        likes: 0,
      };
      setComments([newComment, ...comments]);
      setCommentText("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleComment();
    }
  };

  return (
    <BaseModal onClose={onClose} maxWidth="1200px" hideHeader>
      <Container>
        <VideoSection>
          <VideoThumbnail src={short.thumbnail} alt={short.title} />
          <PlayOverlay>
            <PlayButton>
              <FaPlay />
            </PlayButton>
          </PlayOverlay>
          <MusicInfo>
            <MusicIcon>
              <FaMusic />
            </MusicIcon>
            <MusicDetails>
              <MusicTitle>Neon Dreams</MusicTitle>
              <MusicArtist>Digital Youth</MusicArtist>
            </MusicDetails>
          </MusicInfo>
        </VideoSection>

        <InfoSection>
          <UserInfo>
            <UserAvatar>{short.creator[0]}</UserAvatar>
            <UserDetails>
              <UserName>{short.creator}</UserName>
              <PostTime>{short.uploadDate || "3일 전"}</PostTime>
            </UserDetails>
            <FollowButton>팔로우</FollowButton>
          </UserInfo>

          <Description>{short.title}</Description>

          <Actions>
            <ActionItem $active={isLiked} onClick={handleLike}>
              {isLiked ? <FaHeart /> : <FaRegHeart />}
              <span>{likeCount.toLocaleString()}</span>
            </ActionItem>
            <ActionItem>
              <FaComment />
              <span>{comments.length}</span>
            </ActionItem>
            <ActionItem>
              <FaShare />
              <span>공유</span>
            </ActionItem>
          </Actions>

          <CommentsSection>
            <CommentsHeader>
              <CommentsTitle>
                댓글 <CommentsCount>{comments.length}개</CommentsCount>
              </CommentsTitle>
            </CommentsHeader>

            <CommentsList>
              {comments.map((comment) => (
                <Comment key={comment.id}>
                  <CommentAvatar>{comment.avatar}</CommentAvatar>
                  <CommentContent>
                    <CommentHeader>
                      <CommentUser>{comment.user}</CommentUser>
                      <CommentTime>{comment.time}</CommentTime>
                    </CommentHeader>
                    <CommentText>{comment.text}</CommentText>
                    <CommentActions>
                      <CommentAction>좋아요 {comment.likes}</CommentAction>
                      <CommentAction>답글</CommentAction>
                    </CommentActions>
                  </CommentContent>
                </Comment>
              ))}
            </CommentsList>

            <CommentInput>
              <Input
                placeholder="댓글을 입력하세요..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <SendButton onClick={handleComment} disabled={!commentText.trim()}>
                <FaPaperPlane />
              </SendButton>
            </CommentInput>
          </CommentsSection>
        </InfoSection>
      </Container>
    </BaseModal>
  );
};

export default ShortsDetailModal;
