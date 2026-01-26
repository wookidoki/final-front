import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { lazy, Suspense } from "react";
import GlobalStyle from "./styles/GlobalStyle";
import { createDarkTheme, createLightTheme } from "./styles/theme";
import useUiStore from "./store/useUiStore";

// 공통 컴포넌트 (즉시 로드)
import ErrorBoundary from "./components/common/ErrorBoundary";
import Toast from "./components/common/Toast";
import ModalManager from "./components/Modal/ModalManager";
import LoadingPage from "./pages/LoadingPage/LoadingPage";

// Layout (즉시 로드)
import Layout from "./components/Layout/Layout";

// 페이지 컴포넌트들 (lazy loading)
const Home = lazy(() => import("./features/Home/Home"));
const MyCanvas = lazy(() => import("./pages/MyCanvas/MyCanvas"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const StyleGuide = lazy(() => import("./pages/StyleGuide/StyleGuide"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
const Magazine = lazy(() => import("./pages/Magazine/Magazine"));
const Shorts = lazy(() => import("./pages/Shorts/Shorts"));
const Browse = lazy(() => import("./pages/Browse/Browse"));
const Notice = lazy(() => import("./pages/Notice/Notice"));
const Chat = lazy(() => import("./pages/Chat/Chat"));
const Payment = lazy(() => import("./pages/Payment/Payment"));
const Matching = lazy(() => import("./pages/Matching/Matching"));
const Error500 = lazy(() => import("./pages/ErrorPages/Error500"));
const Error501 = lazy(() => import("./pages/ErrorPages/Error501"));
const Error503 = lazy(() => import("./pages/ErrorPages/Error503"));
const SignupStep1 = lazy(() => import("./pages/Signup/SignupStep1"));
const SignupStep2 = lazy(() => import("./pages/Signup/SignupStep2"));
const SignupStep3 = lazy(() => import("./pages/Signup/SignupStep3"));
const SignupStep4 = lazy(() => import("./pages/Signup/SignupStep4"));
const SignupComplete = lazy(() => import("./pages/Signup/SignupComplete"));

// 임시 페이지
const Placeholder = ({ text }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh",
      fontSize: "2rem",
      color: "#888",
    }}
  >
    🚧 {text} Page
  </div>
);

function App() {
  // store에서 현재 테마 설정 가져오기
  const { currentMode, currentColorTheme, customColors } = useUiStore();

  // 동적으로 테마 생성
  const theme =
    currentMode === "dark"
      ? createDarkTheme(currentColorTheme, currentColorTheme === "custom" ? customColors : null)
      : createLightTheme(currentColorTheme, currentColorTheme === "custom" ? customColors : null);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ErrorBoundary>
        <BrowserRouter>
          <Toast />
          <ModalManager />
          <Suspense fallback={<LoadingPage />}>
            <Routes>
              {/* Layout 없는 페이지들 (회원가입, 에러 페이지 등) */}
              <Route path="/signup/step1" element={<SignupStep1 />} />
              <Route path="/signup/step2" element={<SignupStep2 />} />
              <Route path="/signup/step3" element={<SignupStep3 />} />
              <Route path="/signup/step4" element={<SignupStep4 />} />
              <Route path="/signup/complete" element={<SignupComplete />} />
              <Route path="/error/500" element={<Error500 />} />
              <Route path="/error/501" element={<Error501 />} />
              <Route path="/error/503" element={<Error503 />} />
              <Route path="/loading" element={<LoadingPage />} />

              {/* Layout 있는 페이지들 */}
              <Route
                path="/*"
                element={
                  <Layout>
                    <Routes>
                      {/* 메인 홈 */}
                      <Route path="/" element={<Home />} />

                      {/* 1. 내 홈페이지 (View Mode) */}
                      <Route path="/profile" element={<Profile />} />

                      {/* 2. 편집 페이지  - '마이 유니버스' */}
                      <Route path="/my-universe" element={<MyCanvas />} />

                      {/* 숏폼 페이지 */}
                      <Route path="/shorts" element={<Shorts />} />

                      {/* 매거진 페이지 */}
                      <Route path="/magazine" element={<Magazine />} />

                      {/* 둘러보기 - 차트 페이지 */}
                      <Route path="/search" element={<Browse />} />

                      {/* 공지사항 */}
                      <Route path="/notice" element={<Notice />} />

                      {/* 채팅 */}
                      <Route path="/chat" element={<Chat />} />

                      {/* 결제 */}
                      <Route path="/payment" element={<Payment />} />

                      {/* 매칭 */}
                      <Route path="/matching" element={<Matching />} />

                      {/* 스타일 가이드 */}
                      <Route path="/style-guide" element={<StyleGuide />} />

                      {/* 404 페이지 */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Layout>
                }
              />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
