import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  background: ${({ theme }) => theme.colors.bg};
`;

const LeftSection = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.colors.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;

  @media (max-width: 968px) {
    display: none;
  }
`;

const LeftContent = styled.div`
  text-align: center;
  color: white;
`;

const Logo = styled.h1`
  font-size: 4rem;
  font-weight: 900;
  font-style: italic;
  margin-bottom: 24px;
`;

const Tagline = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.6;
  opacity: 0.9;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 580px;
`;

const ProgressBar = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 40px;
`;

const ProgressStep = styled.div`
  flex: 1;
  height: 6px;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.gradient : theme.colors.border};
  border-radius: 3px;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 12px;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textSub};
  margin-bottom: 40px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const GenreGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const GenreButton = styled.button`
  padding: 24px 20px;
  background: ${({ $selected, theme }) =>
    $selected ? theme.colors.gradient : theme.colors.surface};
  border: 2px solid
    ${({ $selected, theme }) => ($selected ? "transparent" : theme.colors.border)};
  border-radius: 16px;
  color: ${({ $selected, theme }) => ($selected ? "white" : theme.colors.textMain)};
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  span {
    font-size: 2.5rem;
  }

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 6px 20px ${({ theme }) => theme.colors.primary}30;
  }
`;

const SelectedCount = styled.div`
  text-align: center;
  padding: 16px;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.textSub};
  font-size: 0.95rem;
`;

const ErrorMessage = styled.div`
  padding: 12px 16px;
  background: rgba(255, 0, 0, 0.1);
  border: 2px solid rgba(255, 0, 0, 0.3);
  border-radius: 12px;
  color: #ff4444;
  font-size: 0.95rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
`;

const Button = styled.button`
  flex: 1;
  padding: 18px;
  background: ${({ $primary, theme }) =>
    $primary ? theme.colors.gradient : theme.colors.surface};
  color: ${({ $primary, theme }) => ($primary ? "white" : theme.colors.textMain)};
  border: 2px solid ${({ $primary, theme }) => ($primary ? "transparent" : theme.colors.border)};
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px
      ${({ $primary, theme }) => ($primary ? theme.colors.primary : theme.colors.border)}50;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const genres = [
  { id: "kpop", name: "K-POP", emoji: "🎤" },
  { id: "pop", name: "POP", emoji: "🎵" },
  { id: "hiphop", name: "HIP-HOP", emoji: "🎧" },
  { id: "rnb", name: "R&B", emoji: "🎹" },
  { id: "rock", name: "ROCK", emoji: "🎸" },
  { id: "jazz", name: "JAZZ", emoji: "🎺" },
  { id: "edm", name: "EDM", emoji: "🎛️" },
  { id: "indie", name: "INDIE", emoji: "🎼" },
  { id: "classic", name: "클래식", emoji: "🎻" },
  { id: "ballad", name: "발라드", emoji: "💙" },
  { id: "trot", name: "트로트", emoji: "🎤" },
  { id: "folk", name: "포크", emoji: "🎸" },
];

const SignupStep3 = () => {
  const navigate = useNavigate();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // 이전 단계 데이터가 없으면 리다이렉트
    const step1Data = sessionStorage.getItem("signupStep1");
    const step2Data = sessionStorage.getItem("signupStep2");
    if (!step1Data || !step2Data) {
      navigate("/signup/step1");
    }
  }, [navigate]);

  const handleGenreToggle = (genreId) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId) ? prev.filter((id) => id !== genreId) : [...prev, genreId]
    );
    setError("");
  };

  const handleBack = () => {
    navigate("/signup/step2");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (selectedGenres.length === 0) {
      setError("최소 1개 이상의 장르를 선택해주세요");
      return;
    }

    // Step 3 데이터 저장하고 다음 단계로
    sessionStorage.setItem("signupStep3", JSON.stringify({ genres: selectedGenres }));
    navigate("/signup/step4");
  };

  return (
    <Container>
      <LeftSection>
        <LeftContent>
          <Logo>RE:PLAY</Logo>
          <Tagline>
            당신의 음악 취향을
            <br />
            알려주세요
          </Tagline>
        </LeftContent>
      </LeftSection>

      <RightSection>
        <FormContainer>
          <ProgressBar>
            <ProgressStep $active />
            <ProgressStep $active />
            <ProgressStep $active />
            <ProgressStep />
          </ProgressBar>

          <Title>음악 취향</Title>
          <Subtitle>좋아하는 장르를 선택해주세요 (중복 선택 가능)</Subtitle>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Form onSubmit={handleSubmit}>
            <GenreGrid>
              {genres.map((genre) => (
                <GenreButton
                  key={genre.id}
                  type="button"
                  $selected={selectedGenres.includes(genre.id)}
                  onClick={() => handleGenreToggle(genre.id)}
                >
                  <span>{genre.emoji}</span>
                  {genre.name}
                </GenreButton>
              ))}
            </GenreGrid>

            <SelectedCount>
              선택한 장르: {selectedGenres.length}개
              {selectedGenres.length > 0 && " (" + selectedGenres.join(", ") + ")"}
            </SelectedCount>

            <ButtonGroup>
              <Button type="button" onClick={handleBack}>
                <FaArrowLeft />
                이전
              </Button>
              <Button type="submit" $primary>
                다음
                <FaArrowRight />
              </Button>
            </ButtonGroup>
          </Form>
        </FormContainer>
      </RightSection>
    </Container>
  );
};

export default SignupStep3;
