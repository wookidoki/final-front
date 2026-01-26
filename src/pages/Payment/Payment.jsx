import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import {
  FaCrown,
  FaCheck,
  FaCreditCard,
  FaPaypal,
  FaMobileAlt,
  FaLock,
  FaShieldAlt,
} from "react-icons/fa";

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bg};
  padding: 40px 60px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Header = styled.div`
  max-width: 1200px;
  margin: 0 auto 60px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 900;
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 16px;
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.textSub};
`;

const PlansGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto 60px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
`;

const PlanCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 3px solid
    ${({ $featured, theme }) => ($featured ? theme.colors.primary : theme.colors.border)};
  border-radius: 24px;
  padding: 40px 32px;
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;

  ${({ $featured, theme }) =>
    $featured &&
    `
    background: linear-gradient(135deg, ${theme.colors.surface} 0%, ${theme.colors.primary}20 100%);
    transform: scale(1.05);
    box-shadow: 0 20px 60px ${theme.colors.primary}40;
  `}

  &:hover {
    transform: ${({ $featured }) => ($featured ? "scale(1.08)" : "scale(1.03)")};
    box-shadow: 0 16px 48px ${({ theme }) => theme.colors.primary}30;
  }
`;

const FeaturedBadge = styled.div`
  position: absolute;
  top: -16px;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 24px;
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 800;
  box-shadow: 0 4px 16px ${({ theme }) => theme.colors.primary}50;
`;

const PlanIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 20px;
  text-align: center;
`;

const PlanName = styled.h2`
  font-size: 2rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 12px;
  text-align: center;
`;

const PlanPrice = styled.div`
  text-align: center;
  margin-bottom: 8px;
`;

const Price = styled.span`
  font-size: 3rem;
  font-weight: 900;
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const PriceUnit = styled.span`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textSub};
  margin-left: 8px;
`;

const PlanDescription = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textSub};
  font-size: 1rem;
  margin-bottom: 32px;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 32px;
`;

const Feature = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  color: ${({ theme }) => theme.colors.textMain};
  font-size: 1rem;

  svg {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.2rem;
    flex-shrink: 0;
  }
`;

const SelectButton = styled.button`
  width: 100%;
  padding: 16px;
  background: ${({ $featured, theme }) =>
    $featured ? theme.colors.gradient : theme.colors.bg};
  color: ${({ $featured, theme }) => ($featured ? "white" : theme.colors.textMain)};
  border: 2px solid ${({ $featured, theme }) => ($featured ? "transparent" : theme.colors.border)};
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px ${({ theme }) => theme.colors.primary}40;
  }
`;

const PaymentSection = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 24px;
  padding: 40px;
`;

const SectionTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 24px;
`;

const PaymentMethods = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
`;

const PaymentMethod = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 24px 20px;
  background: ${({ $selected, theme }) => ($selected ? theme.colors.bg : "transparent")};
  border: 2px solid
    ${({ $selected, theme }) => ($selected ? theme.colors.primary : theme.colors.border)};
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.bg};
  }

  svg {
    font-size: 2.5rem;
    color: ${({ $selected, theme }) => ($selected ? theme.colors.primary : theme.colors.textSub)};
  }

  span {
    font-size: 1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textMain};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMain};
`;

const Input = styled.input`
  padding: 14px 16px;
  background: ${({ theme }) => theme.colors.bg};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.textMain};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSub};
    opacity: 0.6;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
`;

const SecurityInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.bg};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  margin: 24px 0;

  svg {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.5rem;
  }

  p {
    color: ${({ theme }) => theme.colors.textSub};
    font-size: 0.95rem;
  }
`;

const TotalSection = styled.div`
  padding: 24px;
  background: ${({ theme }) => theme.colors.bg};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 16px;
  margin-bottom: 24px;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
    padding-top: 12px;
    border-top: 2px solid ${({ theme }) => theme.colors.border};
  }
`;

const TotalLabel = styled.span`
  font-size: ${({ $large }) => ($large ? "1.5rem" : "1rem")};
  font-weight: ${({ $large }) => ($large ? "800" : "600")};
  color: ${({ theme }) => theme.colors.textMain};
`;

const TotalValue = styled.span`
  font-size: ${({ $large }) => ($large ? "1.8rem" : "1rem")};
  font-weight: ${({ $large }) => ($large ? "900" : "600")};
  background: ${({ $large, theme }) => ($large ? theme.colors.gradient : "none")};
  -webkit-background-clip: ${({ $large }) => ($large ? "text" : "unset")};
  -webkit-text-fill-color: ${({ $large }) => ($large ? "transparent" : "inherit")};
  color: ${({ $large, theme }) => ($large ? "transparent" : theme.colors.textSub)};
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 18px;
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.2rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px ${({ theme }) => theme.colors.primary}50;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px ${({ theme }) => theme.colors.primary}60;
  }

  &:active {
    transform: translateY(0);
  }
`;

const plans = [
  {
    id: "free",
    name: "Free",
    icon: "🎵",
    price: "0",
    description: "음악 스트리밍의 시작",
    features: [
      "광고 포함 무제한 스트리밍",
      "기본 음질 (128kbps)",
      "셔플 재생",
      "공개 플레이리스트",
    ],
    featured: false,
  },
  {
    id: "premium",
    name: "Premium",
    icon: "⭐",
    price: "9,900",
    description: "가장 인기있는 플랜",
    features: [
      "광고 없는 무제한 스트리밍",
      "고음질 (320kbps)",
      "오프라인 다운로드",
      "무제한 스킵",
      "나만의 유니버스 커스터마이징",
      "우선 고객 지원",
    ],
    featured: true,
  },
  {
    id: "family",
    name: "Family",
    icon: "👨‍👩‍👧‍👦",
    price: "14,900",
    description: "최대 6명이 함께",
    features: [
      "Premium의 모든 혜택",
      "최대 6개 계정",
      "가족 전용 플레이리스트",
      "청소년 보호 기능",
      "각자 개별 추천",
    ],
    featured: false,
  },
];

const Payment = () => {
  const [selectedPlan, setSelectedPlan] = useState(plans[1]);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payment submitted:", { selectedPlan, paymentMethod, formData });
    // TODO: 결제 처리 로직
  };

  return (
    <Container>
      <Header>
        <Title>프리미엄 플랜</Title>
        <Subtitle>당신의 음악 경험을 업그레이드하세요</Subtitle>
      </Header>

      <PlansGrid>
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            $featured={plan.featured}
            onClick={() => setSelectedPlan(plan)}
          >
            {plan.featured && <FeaturedBadge>✨ 인기</FeaturedBadge>}
            <PlanIcon>{plan.icon}</PlanIcon>
            <PlanName>{plan.name}</PlanName>
            <PlanPrice>
              <Price>₩{plan.price}</Price>
              {plan.price !== "0" && <PriceUnit>/ 월</PriceUnit>}
            </PlanPrice>
            <PlanDescription>{plan.description}</PlanDescription>
            <FeatureList>
              {plan.features.map((feature, index) => (
                <Feature key={index}>
                  <FaCheck />
                  {feature}
                </Feature>
              ))}
            </FeatureList>
            <SelectButton $featured={plan.featured}>
              {selectedPlan?.id === plan.id ? "선택됨" : "선택하기"}
            </SelectButton>
          </PlanCard>
        ))}
      </PlansGrid>

      {selectedPlan && selectedPlan.id !== "free" && (
        <PaymentSection>
          <SectionTitle>
            <FaCreditCard /> 결제 정보
          </SectionTitle>

          <PaymentMethods>
            <PaymentMethod
              $selected={paymentMethod === "card"}
              onClick={() => setPaymentMethod("card")}
            >
              <FaCreditCard />
              <span>카드</span>
            </PaymentMethod>
            <PaymentMethod
              $selected={paymentMethod === "paypal"}
              onClick={() => setPaymentMethod("paypal")}
            >
              <FaPaypal />
              <span>PayPal</span>
            </PaymentMethod>
            <PaymentMethod
              $selected={paymentMethod === "mobile"}
              onClick={() => setPaymentMethod("mobile")}
            >
              <FaMobileAlt />
              <span>휴대폰</span>
            </PaymentMethod>
          </PaymentMethods>

          {paymentMethod === "card" && (
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>카드 번호</Label>
                <Input
                  type="text"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  maxLength="19"
                />
              </FormGroup>

              <FormGroup>
                <Label>카드 소유자</Label>
                <Input
                  type="text"
                  name="cardName"
                  placeholder="홍길동"
                  value={formData.cardName}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormRow>
                <FormGroup>
                  <Label>유효기간</Label>
                  <Input
                    type="text"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    maxLength="5"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>CVV</Label>
                  <Input
                    type="text"
                    name="cvv"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={handleChange}
                    maxLength="3"
                  />
                </FormGroup>
              </FormRow>

              <SecurityInfo>
                <FaShieldAlt />
                <p>
                  모든 결제 정보는 SSL 암호화로 안전하게 보호됩니다. 카드 정보는 저장되지 않습니다.
                </p>
              </SecurityInfo>

              <TotalSection>
                <TotalRow>
                  <TotalLabel>선택한 플랜</TotalLabel>
                  <TotalValue>{selectedPlan.name}</TotalValue>
                </TotalRow>
                <TotalRow>
                  <TotalLabel>월 요금</TotalLabel>
                  <TotalValue>₩{selectedPlan.price}</TotalValue>
                </TotalRow>
                <TotalRow>
                  <TotalLabel $large>총 결제 금액</TotalLabel>
                  <TotalValue $large>₩{selectedPlan.price}</TotalValue>
                </TotalRow>
              </TotalSection>

              <SubmitButton type="submit">
                <FaLock />
                결제하기
              </SubmitButton>
            </Form>
          )}
        </PaymentSection>
      )}
    </Container>
  );
};

export default Payment;
