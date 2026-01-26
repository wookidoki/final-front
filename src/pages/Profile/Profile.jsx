import React from "react";
import { FaPen, FaShareAlt, FaHeart } from "react-icons/fa";
import * as S from "./Profile.style"; // 분리된 스타일 불러오기

const Profile = () => {
  return (
    <S.Container>
      {/* 1. 프로필 헤더 */}
      <S.ProfileHeader>
        <S.Avatar>GZ</S.Avatar>
        <S.UserInfo>
          <h1>
            GenZ_Maker
            <S.Tag>🎵 Music Lover</S.Tag>
            <S.Tag>🎨 Creator</S.Tag>
          </h1>
          <p>
            새벽 감성 플리 모으는 중. 힙하지 않으면 안 듣습니다. 팔로우 환영! 👋
          </p>

          <S.Stats>
            <div>
              1.2k <span>Followers</span>
            </div>
            <div>
              89 <span>Following</span>
            </div>
            <div>
              <FaHeart color="#ff0080" /> 4.5k <span>Likes</span>
            </div>
          </S.Stats>
        </S.UserInfo>

        <S.ActionButtons>
          {/* 여기가 편집 페이지(MyCanvas)로 가는 버튼 */}
          <S.EditButton to="/my-universe">
            <FaPen /> 페이지 꾸미기
          </S.EditButton>
          <S.ShareButton>
            <FaShareAlt /> 공유
          </S.ShareButton>
        </S.ActionButtons>
      </S.ProfileHeader>

      {/* 2. 내 유니버스 미리보기 */}
      <S.PreviewSection>
        <S.SectionTitle>🌍 My Universe Preview</S.SectionTitle>
        <S.CanvasPreview>
          <h3 style={{ opacity: 0.5 }}>This is your current vibe</h3>
          {/* 장식용 가짜 위젯 */}
          <div
            className="dummy-widget"
            style={{ width: 200, height: 150, top: 50, left: 100 }}
          ></div>
          <div
            className="dummy-widget"
            style={{
              width: 180,
              height: 180,
              bottom: 40,
              right: 120,
              borderRadius: "50%",
            }}
          ></div>
        </S.CanvasPreview>
      </S.PreviewSection>
    </S.Container>
  );
};

export default Profile;
