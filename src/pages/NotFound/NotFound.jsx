import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaSearch } from "react-icons/fa";
import * as S from "./NotFound.style";

const NotFound = () => {
  return (
    <S.Container>
      <S.Content>
        <S.GlitchText data-text="404">404</S.GlitchText>
        <S.Title>페이지를 찾을 수 없어요</S.Title>
        <S.Description>
          존재하지 않는 주소이거나, 요청하신 페이지의 주소가 변경 또는
          삭제되어 찾을 수 없습니다.
        </S.Description>

        <S.ButtonGroup>
          <S.HomeButton to="/">
            <FaHome />
            <span>홈으로 가기</span>
          </S.HomeButton>
          <S.SearchButton to="/search">
            <FaSearch />
            <span>둘러보기</span>
          </S.SearchButton>
        </S.ButtonGroup>

        <S.FloatingElements>
          <S.FloatingIcon style={{ top: "10%", left: "10%" }}>🎵</S.FloatingIcon>
          <S.FloatingIcon style={{ top: "20%", right: "15%" }}>
            🎧
          </S.FloatingIcon>
          <S.FloatingIcon style={{ bottom: "15%", left: "20%" }}>
            💿
          </S.FloatingIcon>
          <S.FloatingIcon style={{ bottom: "10%", right: "10%" }}>
            🎸
          </S.FloatingIcon>
        </S.FloatingElements>
      </S.Content>
    </S.Container>
  );
};

export default NotFound;
