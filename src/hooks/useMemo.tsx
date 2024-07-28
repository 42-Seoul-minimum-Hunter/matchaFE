import { useNavigate } from "react-router-dom";

const useMemo = () => {
  const navigate = useNavigate();

  const onClickProfile = () => {
    navigate("/profile");
  };
  const onClickSearch = () => {
    navigate("/search");
  };
  const onClickMessage = () => {
    navigate("/message");
  };
  const onClickAlarm = () => {
    navigate("/alarm");
  };

  return { onClickProfile, onClickSearch, onClickMessage, onClickAlarm };
};

// const useInputError = (type: string) => {
//   const validations = [
//     { check: validateUsername(type), error: "username 4 ~ 15" },
//     { check: validatePassword(type), error: "password 8 ~ 15" },
//     {
//       check: validateName(type) && validateName(type),
//       error: "first last name 1 ~ 10",
//     },
//     // { check: validateBiography(type), error: "biography 1 ~ 100" },
//     // { check: validateEmail(type), error: "Invalid email" },
//     // { check: validateAge(type), error: "Choose age" },
//     // {
//     //   check: validateGender(genderType),
//     //   error: "Choose gender",
//     // },
//   ];
//   for (const {check, error} of validations) {

//   }
// };

export default useMemo;
