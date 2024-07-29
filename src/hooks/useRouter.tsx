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

  return { goToProfile, goToSearch, goToMessage, goToAlarm, goToSignup };
};

export default useRouter;
