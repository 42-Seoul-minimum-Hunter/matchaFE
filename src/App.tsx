import { BrowserRouter, Route, Routes } from "react-router-dom";
import AlarmPage from "@/pages/AlarmPage";
import Layout from "@/pages/LayoutPage";
import LoginPage from "@/pages/LoginPage";
import MainPage from "@/pages/MainPage";
import MessagePage from "@/pages/MessagePage";
import SearchPage from "@/pages/SearchPage";
import SignUpPage from "@/pages/SignUpPage";
import ProfilePage from "@/pages/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="main" element={<MainPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="message" element={<MessagePage />} />
          <Route path="alarm" element={<AlarmPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
