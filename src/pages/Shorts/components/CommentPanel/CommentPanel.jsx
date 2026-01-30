import React, { useState, useEffect, useRef, useContext, useCallback } from "react";
import { FaTimes, FaComment, FaPaperPlane, FaTrash, FaSignInAlt } from "react-icons/fa";
import axiosInstance from "../../../../services/Axios/Axios";
import { AuthContext } from "../../../../context/Authcontext";
import useModalStore from "../../../../store/useModalStore";
import * as S from "./CommentPanel.style";

const CommentPanel = ({ shortFormId, onClose, onCommentCountChange }) => {
  const { auth } = useContext(AuthContext);
  const { openModal } = useModalStore();

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  const [lastCommentId, setLastCommentId] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [closing, setClosing] = useState(false);

  const listRef = useRef(null);
  const inputRef = useRef(null);

  // 댓글 목록 조회
  const fetchComments = useCallback(async (cursorId = null) => {
    if (loading) return;
    try {
      setLoading(true);
      const params = { size: 15 };
      if (cursorId) params.lastCommentId = cursorId;

      const res = await axiosInstance.get(
        `/api/shortforms/${shortFormId}/comments`,
        { params }
      );
      const data = res.data?.data;
      const list = data?.content || [];
      const pagination = data?.pagination || {};

      setComments((prev) => {
        if (!cursorId) return list;
        const ids = new Set(prev.map((c) => c.commentId));
        return [...prev, ...list.filter((c) => !ids.has(c.commentId))];
      });
      setHasNext(pagination.hasNext ?? false);
      setLastCommentId(pagination.lastCommentId ?? null);
    } catch (err) {
      console.error("댓글 조회 실패:", err);
    } finally {
      setLoading(false);
    }
  }, [shortFormId, loading]);

  // 초기 로드
  useEffect(() => {
    fetchComments(null);
  }, [shortFormId]);

  // 스크롤로 더 불러오기
  const handleScroll = useCallback(() => {
    if (!listRef.current || !hasNext || loading) return;
    const { scrollTop, scrollHeight, clientHeight } = listRef.current;
    if (scrollHeight - scrollTop - clientHeight < 100) {
      fetchComments(lastCommentId);
    }
  }, [hasNext, loading, lastCommentId, fetchComments]);

  // 닫기 애니메이션
  const handleClose = () => {
    setClosing(true);
    setTimeout(() => onClose(), 280);
  };

  // 댓글 작성
  const handleSubmit = async () => {
    const text = newComment.trim();
    if (!text || submitting) return;
    if (!auth.isAuthenticated) {
      openModal("login");
      return;
    }

    try {
      setSubmitting(true);
      const res = await axiosInstance.post(
        `/api/shortforms/${shortFormId}/comments`,
        { content: text }
      );
      const created = res.data?.data;
      if (created) {
        setComments((prev) => [created, ...prev]);
        onCommentCountChange?.((prev) => prev + 1);
      }
      setNewComment("");
      // 목록 최상단으로 스크롤
      if (listRef.current) listRef.current.scrollTop = 0;
    } catch (err) {
      console.error("댓글 작성 실패:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // Enter 키로 전송
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // 댓글 삭제
  const handleDelete = async (commentId) => {
    if (!confirm("댓글을 삭제하시겠습니까?")) return;
    try {
      await axiosInstance.delete(
        `/api/shortforms/${shortFormId}/comments/${commentId}`
      );
      setComments((prev) => prev.filter((c) => c.commentId !== commentId));
      onCommentCountChange?.((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error("댓글 삭제 실패:", err);
    }
  };

  // 시간 포맷
  const formatTime = (dateStr) => {
    if (!dateStr) return "";
    const diff = Date.now() - new Date(dateStr).getTime();
    const min = Math.floor(diff / 60000);
    if (min < 1) return "방금 전";
    if (min < 60) return `${min}분 전`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr}시간 전`;
    const day = Math.floor(hr / 24);
    if (day < 30) return `${day}일 전`;
    return new Date(dateStr).toLocaleDateString();
  };

  return (
    <>
      <S.Overlay onClick={handleClose} />
      <S.Panel $closing={closing}>
        <S.PanelHeader>
          <h3>댓글 {comments.length > 0 ? comments.length : ""}</h3>
          <S.CloseBtn onClick={handleClose}>
            <FaTimes />
          </S.CloseBtn>
        </S.PanelHeader>

        <S.CommentList ref={listRef} onScroll={handleScroll}>
          {!loading && comments.length === 0 ? (
            <S.EmptyComments>
              <FaComment />
              <p>아직 댓글이 없어요</p>
              <p>첫 번째 댓글을 남겨보세요!</p>
            </S.EmptyComments>
          ) : (
            <>
              {comments.map((c) => (
                <S.CommentItem key={c.commentId}>
                  <S.CommentAvatar>
                    {(c.nickName || "U")[0].toUpperCase()}
                  </S.CommentAvatar>
                  <S.CommentBody>
                    <S.CommentAuthor>
                      <span>{c.nickName || "User"}</span>
                      <span>{formatTime(c.createdAt)}</span>
                    </S.CommentAuthor>
                    <S.CommentText>{c.content}</S.CommentText>
                    {auth.isAuthenticated && auth.memberId === c.memberId && (
                      <S.CommentActions>
                        <S.CommentActionBtn onClick={() => handleDelete(c.commentId)}>
                          <FaTrash /> 삭제
                        </S.CommentActionBtn>
                      </S.CommentActions>
                    )}
                  </S.CommentBody>
                </S.CommentItem>
              ))}
              {loading && <S.LoadingWrap />}
            </>
          )}
        </S.CommentList>

        {auth.isAuthenticated ? (
          <S.InputArea>
            <S.CommentInput
              ref={inputRef}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="댓글 입력..."
              maxLength={300}
            />
            <S.SendBtn
              disabled={!newComment.trim() || submitting}
              onClick={handleSubmit}
            >
              <FaPaperPlane />
            </S.SendBtn>
          </S.InputArea>
        ) : (
          <S.LoginPrompt onClick={() => openModal("login")}>
            <FaSignInAlt /> 로그인하고 댓글을 남겨보세요
          </S.LoginPrompt>
        )}
      </S.Panel>
    </>
  );
};

export default CommentPanel;
