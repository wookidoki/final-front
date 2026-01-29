import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { lazy, Suspense } from "react";
import GlobalStyle from "./styles/GlobalStyle";
import { createDarkTheme, createLightTheme } from "./styles/theme";
import useUiStore from "./store/useUiStore";
import SearchResultPage from "./pages/SearchResult/SearchResultPage";

// 공통 컴포넌트 (즉시 로드)
import ErrorBoundary from "./components/common/ErrorBoundary";
import Toast from "./components/common/Toast";
import ModalManager from "./components/Modal/ModalManager";
import LoadingPage from "./pages/LoadingPage/LoadingPage";

// Layout (즉시 로드)
import Layout from "./components/Layout/Layout";
import { AuthProvider } from "./context/Authcontext";
import { SignupProvider } from "./context/SignUpContext";

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
const ShortsUpload = lazy(() => import("./pages/ShortsUpload/ShortsUpload"));
const Universe = lazy(() => import("./pages/Universe/Universe"));
const UniverseDetail = lazy(
  () => import("./pages/UniverseDetail/UniverseDetail"),
);
const Error500 = lazy(() => import("./pages/ErrorPages/Error500"));
const Error501 = lazy(() => import("./pages/ErrorPages/Error501"));
const Error503 = lazy(() => import("./pages/ErrorPages/Error503"));
const Login = lazy(() => import("./pages/Login/Login")); // (선택) 페이지 로그인 유지할 때만
const AdminDashboard = lazy(
  () => import("./pages/Admin/Dashboard/AdminDashboard"),
);
const AdminMembers = lazy(() => import("./pages/Admin/Members/AdminMembers"));
const AdminNotices = lazy(() => import("./pages/Admin/Notices/AdminNotices"));
const ProfileEdit = lazy(() => import("./pages/ProfileEdit/ProfileEdit"));

function App() {
  const { currentMode, currentColorTheme, customColors } = useUiStore();

  const theme =
    currentMode === "dark"
      ? createDarkTheme(
          currentColorTheme,
          currentColorTheme === "custom" ? customColors : null,
        )
      : createLightTheme(
          currentColorTheme,
          currentColorTheme === "custom" ? customColors : null,
        );

  return (
    <AuthProvider>
      <SignupProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <ErrorBoundary>
            <BrowserRouter>
              <Toast />
              <ModalManager />
              <Suspense fallback={<LoadingPage />}>
                <Routes>
                  {/* Layout 없는 페이지들 (에러/로딩/선택: 로그인 페이지) */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/error/500" element={<Error500 />} />
                  <Route path="/error/501" element={<Error501 />} />
                  <Route path="/error/503" element={<Error503 />} />
                  <Route path="/loading" element={<LoadingPage />} />

                  {/* Layout 있는 페이지들 */}
                  <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/profile/edit" element={<ProfileEdit />} />
                    <Route path="/my-universe" element={<MyCanvas />} />
                    <Route path="/shorts" element={<Shorts />} />
                    <Route path="/shorts/upload" element={<ShortsUpload />} />
                    <Route path="/universe" element={<Universe />} />
                    <Route path="/universe/:id" element={<UniverseDetail />} />
                    <Route path="/magazine" element={<Magazine />} />
                    <Route path="/search" element={<Browse />} />
                    <Route path="/notice" element={<Notice />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/matching" element={<Matching />} />
                    <Route path="/style-guide" element={<StyleGuide />} />
                    <Route
                      path="/search-results"
                      element={<SearchResultPage />}
                    />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/members" element={<AdminMembers />} />
                    <Route path="/admin/notices" element={<AdminNotices />} />

                    {/* 404 */}
                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Routes>
              </Suspense>
            </BrowserRouter>
          </ErrorBoundary>
        </ThemeProvider>
      </SignupProvider>
    </AuthProvider>
  );
}

export default App;
