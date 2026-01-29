// steps/Step6Complete.jsx
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Button } from "../SignupModal";
import { SuccessIcon, SuccessMessage, LoginBtnWrap } from "./Step6Complete";

const Step6Complete = ({ onSwitchToLogin }) => {
  return (
    <>
      <SuccessIcon>
        <FaCheckCircle style={{ color: "#00ff88" }} />
      </SuccessIcon>

      <SuccessMessage>
        <h3>환영합니다! 🎉</h3>
        <p>
          회원가입이 완료되었습니다.
          <br />
          지금 바로 RE:PLAY를 시작해보세요!
        </p>
      </SuccessMessage>

      <LoginBtnWrap>
        <Button $primary type="button" onClick={onSwitchToLogin}>
          로그인하기
        </Button>
      </LoginBtnWrap>
    </>
  );
};

export default Step6Complete;
