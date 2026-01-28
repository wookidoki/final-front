import styled from "styled-components";

// 전체 페이지 컨테이너
export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  background-color: #000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`;

// 검색창 영역
export const SearchWrapper = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
  width: 90%;
  max-width: 400px;
`;

// 컨텐츠 영역
export const ContentArea = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding-top: ${({ $hasSearch }) => ($hasSearch ? "0" : "0")};
`;

// 뷰어 모달 (그리드에서 클릭 시)
export const ViewerModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ViewerClose = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 110;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

export const ViewerContent = styled.div`
  width: 100%;
  max-width: 450px;
  height: 90vh;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    max-width: 100%;
    height: 100vh;
  }
`;
