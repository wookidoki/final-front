import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 40px;
  background: ${({ theme }) => theme.colors.bg};
`;

const ErrorIcon = styled.div`
  font-size: 5rem;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 16px;
`;

const Message = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textSub};
  max-width: 500px;
  text-align: center;
  margin-bottom: 32px;
  line-height: 1.6;
`;

const ErrorDetails = styled.details`
  max-width: 600px;
  width: 100%;
  margin-bottom: 32px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 16px;

  summary {
    cursor: pointer;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textMain};
    margin-bottom: 12px;
  }

  pre {
    background: ${({ theme }) => theme.colors.bg};
    padding: 16px;
    border-radius: 6px;
    overflow-x: auto;
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.error};
    line-height: 1.5;
  }
`;

const ReloadButton = styled.button`
  padding: 14px 32px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary}dd;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.primary}40;
  }
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container>
          <ErrorIcon>💥</ErrorIcon>
          <Title>앗, 문제가 발생했어요!</Title>
          <Message>
            예상치 못한 오류가 발생했습니다. 페이지를 새로고침하거나 잠시 후 다시
            시도해주세요.
          </Message>

          {this.state.error && (
            <ErrorDetails>
              <summary>오류 상세 정보</summary>
              <pre>
                {this.state.error.toString()}
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </ErrorDetails>
          )}

          <ReloadButton onClick={this.handleReload}>
            페이지 새로고침
          </ReloadButton>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
