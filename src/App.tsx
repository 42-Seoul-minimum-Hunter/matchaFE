import { BrowserRouter, Route, Routes } from "react-router-dom";
import AlarmPage from "@/pages/AlarmPage";
import Layout from "@/pages/LayoutPage";
import LoginPage from "@/pages/LoginPage";

import SearchPage from "@/pages/SearchPage";
import SignUpPage from "@/pages/SignUpPage";
import ProfilePage from "@/pages/ProfilePage";
import EmailPage from "./pages/EmailPage";
import SignupDetailPage from "@/pages/SignupDetailPage";
import TwoFactorPage from "@/pages/TwoFactor";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SettingPage from "./pages/SettingPage";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="signup/detail" element={<SignupDetailPage />} />
          {/* <Route path="main" element={<MainPage />} /> */}
          <Route path="search" element={<SearchPage />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="alarm" element={<AlarmPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="setting" element={<SettingPage />} />
          <Route path="resetPW" element={<ResetPasswordPage />} />
          <Route path="twofactor" element={<TwoFactorPage />} />
          <Route path="email" element={<EmailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
