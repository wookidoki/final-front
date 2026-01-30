import styled, { keyframes } from "styled-components";

const slideUp = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`;

const slideDown = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(100%); }
`;

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 50;
`;

export const Panel = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60%;
  max-height: 500px;
  background: #1e1e1e;
  border-radius: 16px 16px 0 0;
  z-index: 60;
  display: flex;
  flex-direction: column;
  animation: ${({ $closing }) => ($closing ? slideDown : slideUp)} 0.3s ease forwards;
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px 20px;
  border-bottom: 1px solid #333;
  position: relative;
  flex-shrink: 0;

  h3 {
    font-size: 1rem;
    font-weight: 700;
    color: #fff;
    margin: 0;
  }
`;

export const CloseBtn = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #aaa;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 4px;
  display: flex;

  &:hover {
    color: #fff;
  }
`;

export const CommentList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 12px 16px;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #444;
    border-radius: 2px;
  }
`;

export const CommentItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 10px 0;

  & + & {
    border-top: 1px solid #2a2a2a;
  }
`;

export const CommentAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff0080, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
  color: white;
  flex-shrink: 0;
`;

export const CommentBody = styled.div`
  flex: 1;
  min-width: 0;
`;

export const CommentAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;

  span:first-child {
    font-size: 0.85rem;
    font-weight: 700;
    color: #ccc;
  }

  span:last-child {
    font-size: 0.75rem;
    color: #666;
  }
`;

export const CommentText = styled.p`
  font-size: 0.9rem;
  color: #eee;
  line-height: 1.4;
  margin: 0;
  word-break: break-word;
`;

export const CommentActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 6px;
`;

export const CommentActionBtn = styled.button`
  background: none;
  border: none;
  color: #888;
  font-size: 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0;

  &:hover {
    color: #ff4444;
  }
`;

export const InputArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-top: 1px solid #333;
  background: #1e1e1e;
  flex-shrink: 0;
`;

export const CommentInput = styled.input`
  flex: 1;
  background: #2a2a2a;
  border: 1px solid #3a3a3a;
  border-radius: 24px;
  padding: 10px 16px;
  color: #fff;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.2s;

  &::placeholder {
    color: #666;
  }

  &:focus {
    border-color: #ff0080;
  }
`;

export const SendBtn = styled.button`
  background: ${({ disabled }) => (disabled ? "#333" : "linear-gradient(135deg, #ff0080, #8b5cf6)")};
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ disabled }) => (disabled ? "#666" : "#fff")};
  font-size: 1rem;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  flex-shrink: 0;
  transition: opacity 0.2s;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }
`;

export const EmptyComments = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #666;
  gap: 8px;

  svg {
    font-size: 2.5rem;
    opacity: 0.4;
  }

  p {
    font-size: 0.95rem;
  }
`;

export const LoadingWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;

  &::after {
    content: "";
    width: 24px;
    height: 24px;
    border: 2px solid #444;
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export const LoginPrompt = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 16px;
  border-top: 1px solid #333;
  background: #1e1e1e;
  flex-shrink: 0;
  color: #888;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    color: #ff0080;
  }

  svg {
    font-size: 1rem;
  }
`;
