import { BrowserRouter, Route, Routes } from "react-router-dom";
import AlarmPage from "@/pages/AlarmPage";
import Layout from "@/pages/LayoutPage";
import LoginPage from "@/pages/LoginPage";
import MainPage from "@/pages/MainPage";
import MessagePage from "@/pages/MessagePage";
import SearchPage from "@/pages/SearchPage";
import SignUpPage from "@/pages/SignUpPage";
import ProfilePage from "@/pages/ProfilePage";
// import Layout from "@/pages/Layout";
// import Home from "@/pages/Home";
// import GamePreview from "@/pages/GamePreview";
// import Login from "./pages/Login";

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
          {/* <Route path="home" element={<Home />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="game" element={<GamePreview />}></Route> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
