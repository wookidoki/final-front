import React, { useState } from "react";
import styled from "styled-components";
import {
  colors,
  typography,
  PrimaryButton,
  SecondaryButton,
  OutlineButton,
  GhostButton,
  SmallButton,
  LargeButton,
  Card,
  GlassCard,
  Input,
  TextArea,
  Badge,
  Tag,
} from "../../styles/commonStyles";

const Container = styled.div`
  width: 100%;
  padding: 40px;
  overflow-y: auto;
  height: 100vh;
`;

const Header = styled.div`
  margin-bottom: 60px;
`;

const Title = styled.h1`
  ${typography.h1}
  background: linear-gradient(135deg, ${colors.white} 0%, ${colors.primary} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 16px;
`;

const Subtitle = styled.p`
  ${typography.body}
  color: ${colors.textSub};
`;

const Section = styled.section`
  margin-bottom: 60px;
`;

const SectionTitle = styled.h2`
  ${typography.h2}
  color: ${colors.textMain};
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 2px solid ${colors.border};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

const ColorBox = styled.div`
  background: ${(props) => props.color};
  padding: 40px 20px;
  border-radius: 12px;
  text-align: center;
  border: 1px solid ${colors.borderLight};
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ColorName = styled.div`
  color: ${(props) => (props.isDark ? colors.textMain : colors.bg)};
  font-weight: 600;
  margin-bottom: 8px;
`;

const ColorCode = styled.div`
  color: ${(props) => (props.isDark ? colors.textSub : colors.textSub)};
  font-size: 0.875rem;
  font-family: monospace;
`;

const ButtonGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 30px;
`;

const TypographyExample = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  background: ${colors.surface};
  border-radius: 8px;
`;

const CodeBlock = styled.pre`
  background: ${colors.bg};
  padding: 20px;
  border-radius: 8px;
  overflow-x: auto;
  color: ${colors.accent};
  font-size: 0.875rem;
  border: 1px solid ${colors.border};
`;

const InputExample = styled.div`
  max-width: 400px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  color: ${colors.textMain};
  margin-bottom: 8px;
  font-weight: 600;
`;

const BadgeContainer = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const LogoShowcase = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
  margin-bottom: 30px;
  padding: 40px;
  background: ${colors.surface};
  border-radius: 12px;
`;

const Logo = styled.div`
  font-size: 3rem;
  font-weight: 900;
  font-style: italic;
  letter-spacing: -1px;
`;

const LogoRE = styled.span`
  color: ${colors.white};
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
`;

const LogoPLAY = styled.span`
  color: ${colors.primary};
  text-shadow: 0 0 10px ${colors.primary};
`;

const LogoDescription = styled.div`
  flex: 1;
  color: ${colors.textSub};
  line-height: 1.6;
`;

const StyleGuide = () => {
  const [inputValue, setInputValue] = useState("");
  const [textAreaValue, setTextAreaValue] = useState("");

  const colorPalette = [
    { name: "Primary", color: colors.primary, code: "#ff0080", isDark: true },
    { name: "Secondary", color: colors.secondary, code: "#d8b4fe", isDark: false },
    { name: "Accent", color: colors.accent, code: "#bef264", isDark: false },
    { name: "White", color: colors.white, code: "#ffffff", isDark: false },
    { name: "Background", color: colors.bg, code: "#1c1917", isDark: true },
    { name: "Surface", color: colors.surface, code: "#292524", isDark: true },
    { name: "Text Main", color: colors.textMain, code: "#e7e5e4", isDark: false },
    { name: "Text Sub", color: colors.textSub, code: "#a8a29e", isDark: false },
  ];

  return (
    <Container>
      <Header>
        <Title>RE:PLAY Design System</Title>
        <Subtitle>
          공통 컴포넌트와 스타일 가이드 - Gen-Z의 감성을 담은 디자인 시스템
        </Subtitle>
      </Header>

      {/* Logo Section */}
      <Section>
        <SectionTitle>Logo</SectionTitle>
        <LogoShowcase>
          <Logo>
            <LogoRE>RE:</LogoRE>
            <LogoPLAY>PLAY</LogoPLAY>
          </Logo>
          <LogoDescription>
            <strong>RE:PLAY</strong> 로고는 두 가지 색상으로 구성됩니다.
            <br />
            <strong>RE:</strong> 부분은 순백색 (#ffffff)으로 새로운 시작을,
            <br />
            <strong>PLAY</strong> 부분은 네온 핑크색 (#ff0080)으로 열정과 에너지를 표현합니다.
          </LogoDescription>
        </LogoShowcase>
        <CodeBlock>{`<Logo>
  <LogoRE>RE:</LogoRE>
  <LogoPLAY>PLAY</LogoPLAY>
</Logo>`}</CodeBlock>
      </Section>

      {/* Color Palette */}
      <Section>
        <SectionTitle>Color Palette</SectionTitle>
        <Grid>
          {colorPalette.map((item) => (
            <ColorBox key={item.name} color={item.color}>
              <ColorName isDark={item.isDark}>{item.name}</ColorName>
              <ColorCode isDark={item.isDark}>{item.code}</ColorCode>
            </ColorBox>
          ))}
        </Grid>
        <CodeBlock>{`import { colors } from './styles/commonStyles';

// 사용 예시:
background: \${colors.primary};
color: \${colors.textMain};`}</CodeBlock>
      </Section>

      {/* Typography */}
      <Section>
        <SectionTitle>Typography</SectionTitle>
        <TypographyExample>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "16px" }}>
            Heading 1
          </h1>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "16px" }}>
            Heading 2
          </h2>
          <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "16px" }}>
            Heading 3
          </h3>
          <p style={{ fontSize: "1rem", marginBottom: "16px" }}>
            Body text - 본문 텍스트는 가독성을 위해 1rem 크기와 1.6 line-height를 사용합니다.
          </p>
          <small style={{ fontSize: "0.875rem" }}>
            Small text - 부가 정보나 캡션에 사용됩니다.
          </small>
        </TypographyExample>
        <CodeBlock>{`import { typography } from './styles/commonStyles';

const Title = styled.h1\`
  \${typography.h1}
\`;`}</CodeBlock>
      </Section>

      {/* Buttons */}
      <Section>
        <SectionTitle>Buttons</SectionTitle>
        <ButtonGrid>
          <PrimaryButton>Primary</PrimaryButton>
          <SecondaryButton>Secondary</SecondaryButton>
          <OutlineButton>Outline</OutlineButton>
          <GhostButton>Ghost</GhostButton>
        </ButtonGrid>
        <ButtonGrid>
          <SmallButton>Small</SmallButton>
          <PrimaryButton>Medium (Default)</PrimaryButton>
          <LargeButton>Large</LargeButton>
        </ButtonGrid>
        <ButtonGrid>
          <PrimaryButton disabled>Disabled</PrimaryButton>
        </ButtonGrid>
        <CodeBlock>{`import {
  PrimaryButton,
  SecondaryButton,
  OutlineButton,
  GhostButton,
} from './styles/commonStyles';

<PrimaryButton>Click me!</PrimaryButton>
<SecondaryButton>Secondary</SecondaryButton>`}</CodeBlock>
      </Section>

      {/* Cards */}
      <Section>
        <SectionTitle>Cards</SectionTitle>
        <Grid>
          <Card>
            <h3 style={{ marginBottom: "12px", color: colors.textMain }}>
              Basic Card
            </h3>
            <p style={{ color: colors.textSub }}>
              기본 카드 컴포넌트입니다.
            </p>
          </Card>
          <GlassCard>
            <h3 style={{ marginBottom: "12px", color: colors.textMain }}>
              Glass Card
            </h3>
            <p style={{ color: colors.textSub }}>
              글래스모피즘 효과가 적용된 카드입니다.
            </p>
          </GlassCard>
        </Grid>
        <CodeBlock>{`import { Card, GlassCard } from './styles/commonStyles';

<Card>
  <h3>Card Title</h3>
  <p>Card content...</p>
</Card>

<GlassCard>
  <h3>Glass Card</h3>
  <p>Glassmorphism effect...</p>
</GlassCard>`}</CodeBlock>
      </Section>

      {/* Input Fields */}
      <Section>
        <SectionTitle>Input Fields</SectionTitle>
        <InputExample>
          <Label>Text Input</Label>
          <Input
            type="text"
            placeholder="입력해주세요..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </InputExample>
        <InputExample>
          <Label>Text Area</Label>
          <TextArea
            placeholder="여러 줄 입력 가능..."
            value={textAreaValue}
            onChange={(e) => setTextAreaValue(e.target.value)}
          />
        </InputExample>
        <CodeBlock>{`import { Input, TextArea } from './styles/commonStyles';

<Input
  type="text"
  placeholder="Enter text..."
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>

<TextArea
  placeholder="Enter description..."
  value={description}
  onChange={(e) => setDescription(e.target.value)}
/>`}</CodeBlock>
      </Section>

      {/* Badges & Tags */}
      <Section>
        <SectionTitle>Badges & Tags</SectionTitle>
        <BadgeContainer>
          <Badge>NEW</Badge>
          <Badge>HOT</Badge>
          <Badge>SALE</Badge>
        </BadgeContainer>
        <br />
        <BadgeContainer>
          <Tag>React</Tag>
          <Tag>JavaScript</Tag>
          <Tag>Styled-Components</Tag>
        </BadgeContainer>
        <CodeBlock>{`import { Badge, Tag } from './styles/commonStyles';

<Badge>NEW</Badge>
<Tag>React</Tag>`}</CodeBlock>
      </Section>

      {/* Usage Guide */}
      <Section>
        <SectionTitle>사용 방법</SectionTitle>
        <Card>
          <h3 style={{ color: colors.primary, marginBottom: "16px" }}>
            공통 스타일 가져오기
          </h3>
          <CodeBlock>{`// 1. 필요한 컴포넌트/스타일 import
import {
  colors,
  typography,
  PrimaryButton,
  Card,
  Input,
} from './styles/commonStyles';

// 2. styled-components에서 사용
const MyComponent = styled.div\`
  background: \${colors.surface};
  color: \${colors.textMain};
  \${typography.body}
\`;

// 3. 컴포넌트로 바로 사용
function MyPage() {
  return (
    <Card>
      <h2>제목</h2>
      <Input placeholder="입력..." />
      <PrimaryButton>확인</PrimaryButton>
    </Card>
  );
}`}</CodeBlock>
        </Card>
      </Section>
    </Container>
  );
};

export default StyleGuide;
