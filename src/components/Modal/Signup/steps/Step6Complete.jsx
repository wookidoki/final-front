import React from "react";
import { Wrap, Title, Desc, Center } from "./Step6Complete.styles";
import { ButtonGroup, Button } from "../SignupModal.styles";

const Step6Complete = ({ onLogin }) => {
  return (
    <Wrap>
      <Center>
        <Title>회원가입 완료 🎉</Title>
        <Desc>이제 로그인하고 서비스를 시작해 보세요.</Desc>

        <ButtonGroup>
          <Button $primary onClick={onLogin}>
            로그인하기
          </Button>
        </ButtonGroup>
      </Center>
    </Wrap>
  );
};

export default Step6Complete;
