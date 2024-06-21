import { axiosChangePassword, axiosFindPW } from "@/api/axios.custom";
import InputTemplate from "@/components/InputTemplate";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const FindPwPage = () => {
  const navigator = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [checkedEmail, setCheckedEmail] = useState<boolean>(true);
  // const isEmail = useState<boolean>(true);

  const checkEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const changeCheckPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckPassword(e.target.value);
  };

  const onClickSavePassword = () => {
    // 비밀번호 변경 api
    if (password === checkPassword) {
      try {
        // 데이터 에러 나면 서버오류 띄우고 로그인 페이지 ?
        const res = axiosChangePassword(password);
      } catch (error: any) {
        console.log("error", error);
        throw error;
      }
      navigator("/login");
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  const findEmail = async () => {
    try {
      const res = await axiosFindPW(email);
      setCheckedEmail(true);
    } catch (error: any) {
      console.log("error", error);
      setCheckedEmail(false);
      throw error;
    }
  };

  return (
    <WrapperStyled>
      <CardStyled>
        <InputContainer>
          <HeaderStyled>
            <h1>Find My Password</h1>
            <InfoTextStyled>
              {checkedEmail ? (
                <p>변경할 패스워드를 입력하세요</p>
              ) : (
                <>
                  <p>아래에 가입한 이메일을 입력해주세요</p>
                  <p>이메일이 맞으면 비밀번호 변경화면으로 넘어갑니다.</p>
                </>
              )}
            </InfoTextStyled>
          </HeaderStyled>
          {checkedEmail ? (
            <>
              <InputTemplate
                title="password"
                placeholder="Add a your password"
                value={password}
                onChange={changePassword}
                type="password"
              />
              <InputTemplate
                title="check Password"
                placeholder="Add a your check password"
                value={checkPassword}
                onChange={changeCheckPassword}
                type="password"
              />
            </>
          ) : (
            <>
              <InputTemplate
                title="Email"
                placeholder="Add a your Email"
                value={email}
                onChange={checkEmail}
              />
            </>
          )}

          {checkedEmail ? null : <p>등록된 이메일이 아닙니다.</p>}
          {checkedEmail ? (
            <SubmitButtonStyled onClick={onClickSavePassword}>
              find pw
            </SubmitButtonStyled>
          ) : (
            <SubmitButtonStyled onClick={findEmail}>submit</SubmitButtonStyled>
          )}
        </InputContainer>
      </CardStyled>
    </WrapperStyled>
  );
};

export default FindPwPage;

const InputContainer = styled.div`
  width: 100%;
  max-width: 600px;
`;

const HeaderStyled = styled.div`
  & > h1 {
    font-size: 2.5rem;
    font-weight: 500;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const InfoTextStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > p {
    font-size: 1.2rem;
    margin: 10px 0;
  }
`;

const SubmitButtonStyled = styled.button`
  width: 100%;
  font-size: 1.2rem;
  padding: 15px 0px;
  border-radius: 30px;
  margin-top: 30px;
  background-color: var(--vermilion);
`;

const CardStyled = styled.div`
  width: 80%;
  height: 80%;
  padding: 0 40px;
  border: 1px solid black;

  border-radius: 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.8);
  /* background-color: rgba(0, 0, 0, 0.5); */
  /* box-shadow: 0 0 10px; */

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const WrapperStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
