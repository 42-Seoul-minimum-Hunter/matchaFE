import { useNavigate } from "react-router-dom";

const useRouter = () => {
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate("/profile");
  };
  const goToSearch = () => {
    navigate("/search");
  };
  const goToMessage = () => {
    navigate("/message");
  };
  const goToAlarm = () => {
    navigate("/alarm");
  };
  const goToSignup = () => {
    navigate("/signup");
  };
  const goTologin = () => {
    navigate("/login");
  };
  const goToResetPW = () => {
    navigate("/resetPW");
  };

  return {
    goToProfile,
    goToSearch,
    goToMessage,
    goToAlarm,
    goToSignup,
    goTologin,
    goToResetPW,
  };
};

export default useRouter;
