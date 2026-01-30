import React, { useState, useContext } from "react";
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
import api from "../../services/Axios/Axios";
import { AuthContext } from "../../context/Authcontext";

const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
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
      const requestData = {
        memberDto: {
          email: formData.email,
        },
        password: formData.password,
      };

      const response = await api.post("/api/members/login", requestData);

      if (response.data && response.data.status === 200) {
        const { accessToken, refreshToken, memberId, role, email } = response.data.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("memberId", memberId);
        localStorage.setItem("role", role);
        localStorage.setItem("email", email || formData.email);

        setAuth({
          memberId,
          email: email || formData.email,
          accesstoken: accessToken,
          refreshtoken: refreshToken,
          role,
          isAuthenticated: true,
        });

        setIsLoading(false);
        navigate("/");
      }
    } catch (err) {
      setIsLoading(false);
      if (err.response && err.response.status === 401) {
        setErrors({ general: "이메일 또는 비밀번호가 일치하지 않습니다." });
      } else {
        setErrors({ general: err.response?.data?.message || "로그인에 실패했습니다. 다시 시도해주세요." });
      }
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
