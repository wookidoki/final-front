import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaComment,
} from "react-icons/fa";
import { SiNaver } from "react-icons/si";
import * as S from "./Login.style";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // 에러 초기화
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "이메일을 입력해주세요";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다";
    }
    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // TODO: API 연동
      // const response = await fetch('/api/members/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      console.log("로그인 시도:", formData);

      // 임시로 성공 처리
      setTimeout(() => {
        setIsLoading(false);
        navigate("/");
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      setErrors({ general: "로그인에 실패했습니다. 다시 시도해주세요." });
    }
  };

  const handleSocialLogin = (provider) => {
    // TODO: 소셜 로그인 구현
    console.log(`${provider} 로그인`);
  };

  return (
    <S.Container>
      <S.BackgroundEffect />

      <S.LoginCard>
        <S.Logo>
          <S.LogoIcon>🎵</S.LogoIcon>
          <S.LogoText>RE:PLAY</S.LogoText>
        </S.Logo>

        <S.Title>Welcome Back!</S.Title>
        <S.Subtitle>계정에 로그인하세요</S.Subtitle>

        {errors.general && <S.ErrorBanner>{errors.general}</S.ErrorBanner>}

        <S.Form onSubmit={handleSubmit}>
          <S.InputGroup>
            <S.InputWrapper $hasError={!!errors.email}>
              <S.InputIcon>
                <FaEnvelope />
              </S.InputIcon>
              <S.Input
                type="email"
                name="email"
                placeholder="이메일"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </S.InputWrapper>
            {errors.email && <S.ErrorText>{errors.email}</S.ErrorText>}
          </S.InputGroup>

          <S.InputGroup>
            <S.InputWrapper $hasError={!!errors.password}>
              <S.InputIcon>
                <FaLock />
              </S.InputIcon>
              <S.Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="비밀번호"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              <S.TogglePassword onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </S.TogglePassword>
            </S.InputWrapper>
            {errors.password && <S.ErrorText>{errors.password}</S.ErrorText>}
          </S.InputGroup>

          <S.OptionsRow>
            <S.RememberMe>
              <S.Checkbox
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember">로그인 상태 유지</label>
            </S.RememberMe>
            <S.ForgotPassword to="/forgot-password">
              비밀번호 찾기
            </S.ForgotPassword>
          </S.OptionsRow>

          <S.LoginButton type="submit" disabled={isLoading}>
            {isLoading ? <S.Spinner /> : "로그인"}
          </S.LoginButton>
        </S.Form>

        <S.Divider>
          <span>또는</span>
        </S.Divider>

        <S.SocialButtons>
          <S.SocialButton
            $provider="google"
            onClick={() => handleSocialLogin("google")}
          >
            <FaGoogle />
            <span>Google</span>
          </S.SocialButton>
          <S.SocialButton
            $provider="kakao"
            onClick={() => handleSocialLogin("kakao")}
          >
            <FaComment />
            <span>Kakao</span>
          </S.SocialButton>
          <S.SocialButton
            $provider="naver"
            onClick={() => handleSocialLogin("naver")}
          >
            <SiNaver />
            <span>Naver</span>
          </S.SocialButton>
        </S.SocialButtons>

        <S.SignupLink>
          계정이 없으신가요?{" "}
          <Link to="/signup/step1">회원가입</Link>
        </S.SignupLink>
      </S.LoginCard>
    </S.Container>
  );
};

export default Login;
