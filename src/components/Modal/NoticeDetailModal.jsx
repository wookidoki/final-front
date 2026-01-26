import React from "react";
import styled from "styled-components";
import { FaBullhorn, FaClock, FaEye, FaShare, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import BaseModal from "./BaseModal";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Header = styled.div`
  padding-bottom: 24px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
`;

const BadgeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const NoticeBadge = styled.span`
  display: inline-block;
  padding: 6px 16px;
  background: ${({ $type, theme }) => {
    switch ($type) {
      case "important":
        return theme.colors.gradient;
      case "event":
        return "#fbbf24";
      case "update":
        return "#60a5fa";
      default:
        return theme.colors.border;
    }
  }};
  color: ${({ $type }) => ($type === "normal" ? "inherit" : "white")};
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 700;
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  color: ${({ theme }) => theme.colors.textSub};
  font-size: 0.95rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.textMain};
  line-height: 1.4;
  margin-bottom: 16px;
`;

const Content = styled.div`
  padding: 24px 0;
  color: ${({ theme }) => theme.colors.textMain};
  font-size: 1.1rem;
  line-height: 1.8;
  min-height: 200px;

  p {
    margin-bottom: 16px;
  }

  h3 {
    font-size: 1.4rem;
    font-weight: 700;
    margin: 28px 0 16px;
    color: ${({ theme }) => theme.colors.textMain};
  }

  ul, ol {
    margin-left: 24px;
    margin-bottom: 16px;
  }

  li {
    margin-bottom: 8px;
  }

  strong {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
  }
`;

const AttachmentSection = styled.div`
  padding: 20px;
  background: ${({ theme }) => theme.colors.bg};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  margin-bottom: 24px;
`;

const AttachmentTitle = styled.h4`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 12px;
`;

const AttachmentItem = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.textMain};
  text-decoration: none;
  transition: all 0.3s ease;
  margin-bottom: 8px;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surfaceHover};
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const Footer = styled.div`
  padding-top: 24px;
  border-top: 2px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: ${({ theme }) => theme.colors.bg};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.textMain};
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Navigation = styled.div`
  display: flex;
  gap: 12px;
`;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.textMain};
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const NoticeDetailModal = ({ notice, onClose }) => {
  const handleShare = () => {
    // TODO: 공유 기능 구현
    console.log("Share notice:", notice.id);
  };

  const handlePrevious = () => {
    // TODO: 이전 공지사항으로 이동
    console.log("Previous notice");
  };

  const handleNext = () => {
    // TODO: 다음 공지사항으로 이동
    console.log("Next notice");
  };

  // 더미 상세 내용
  const fullContent = `
    <p>${notice.preview}</p>

    <h3>주요 내용</h3>
    <p>
      안녕하세요, RE:PLAY입니다.<br/>
      항상 저희 서비스를 이용해 주셔서 감사합니다.
    </p>

    <p>
      ${notice.type === "important" ? "중요한 공지사항이 있어 안내드립니다." : ""}
      ${notice.type === "event" ? "회원님들을 위한 특별한 이벤트를 준비했습니다." : ""}
      ${notice.type === "update" ? "새로운 기능과 개선사항을 소개합니다." : ""}
    </p>

    <h3>상세 안내</h3>
    <ul>
      <li>변경일자: ${notice.date}</li>
      <li>적용 범위: 전체 회원</li>
      <li>문의사항: support@replay.com</li>
    </ul>

    <p>
      <strong>자세한 내용은 아래 첨부파일을 확인해주세요.</strong>
    </p>

    <p>
      앞으로도 더 나은 서비스로 보답하겠습니다.<br/>
      감사합니다.
    </p>
  `;

  return (
    <BaseModal onClose={onClose} maxWidth="800px" hideHeader>
      <Container>
        <Header>
          <BadgeRow>
            <NoticeBadge $type={notice.type}>{notice.badge}</NoticeBadge>
          </BadgeRow>
          <Title>{notice.title}</Title>
          <MetaInfo>
            <MetaItem>
              <FaClock />
              {notice.date}
            </MetaItem>
            <MetaItem>
              <FaEye />
              1,234 조회
            </MetaItem>
          </MetaInfo>
        </Header>

        <Content dangerouslySetInnerHTML={{ __html: fullContent }} />

        {notice.type !== "normal" && (
          <AttachmentSection>
            <AttachmentTitle>📎 첨부파일</AttachmentTitle>
            <AttachmentItem href="#" download>
              📄 공지사항_상세안내.pdf (2.3 MB)
            </AttachmentItem>
            {notice.type === "event" && (
              <AttachmentItem href="#" download>
                🎨 이벤트_상세이미지.jpg (1.5 MB)
              </AttachmentItem>
            )}
          </AttachmentSection>
        )}

        <Footer>
          <ActionButtons>
            <ActionButton onClick={handleShare}>
              <FaShare />
              공유하기
            </ActionButton>
          </ActionButtons>

          <Navigation>
            <NavButton onClick={handlePrevious}>
              <FaChevronLeft />
              이전
            </NavButton>
            <NavButton onClick={handleNext}>
              다음
              <FaChevronRight />
            </NavButton>
          </Navigation>
        </Footer>
      </Container>
    </BaseModal>
  );
};

export default NoticeDetailModal;
