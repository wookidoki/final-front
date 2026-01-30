import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaCamera, FaCheck } from "react-icons/fa";
import {
  PageContainer,
  PageHeader,
  PageHeaderLeft,
  PageTitle,
  PageSubtitle,
  BackButton,
} from "../../styles/common/PageLayout";
import { FormGroup, FormLabel, FormInput, FormTextarea, FormHint, Spinner } from "../../styles/common/Form";
import { PrimaryButton, SecondaryButton } from "../../styles/common/Button";
import * as S from "./ProfileEdit.style";

// 더미 사용자 데이터
const dummyUser = {
  id: 1,
  name: "GenZ_Maker",
  email: "genz@email.com",
  bio: "음악을 사랑하는 Gen Z입니다 🎵",
  profileImage: null,
  stats: { universes: 12, shorts: 48, followers: 1234 },
};

const ProfileEdit = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const [profileForm, setProfileForm] = useState({ name: "", bio: "", profileImage: null });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [passwordStrength, setPasswordStrength] = useState("");

  useEffect(() => {
    setProfileForm({ name: dummyUser.name, bio: dummyUser.bio, profileImage: dummyUser.profileImage });
  }, []);

  useEffect(() => {
    const pwd = passwordForm.newPassword;
    if (!pwd) { setPasswordStrength(""); return; }
    if (pwd.length < 6) setPasswordStrength("weak");
    else if (pwd.length >= 8 && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && /[^A-Za-z0-9]/.test(pwd)) setPasswordStrength("strong");
    else setPasswordStrength("medium");
  }, [passwordForm.newPassword]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileForm((prev) => ({ ...prev, profileImage: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const validateProfile = () => {
    const newErrors = {};
    if (!profileForm.name.trim()) newErrors.name = "이름을 입력해주세요";
    else if (profileForm.name.length < 2) newErrors.name = "이름은 2자 이상이어야 합니다";
    if (profileForm.bio.length > 150) newErrors.bio = "소개는 150자 이내로 입력해주세요";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors = {};
    if (!passwordForm.currentPassword) newErrors.currentPassword = "현재 비밀번호를 입력해주세요";
    if (!passwordForm.newPassword) newErrors.newPassword = "새 비밀번호를 입력해주세요";
    else if (passwordForm.newPassword.length < 6) newErrors.newPassword = "비밀번호는 6자 이상이어야 합니다";
    if (passwordForm.newPassword !== passwordForm.confirmPassword) newErrors.confirmPassword = "비밀번호가 일치하지 않습니다";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileSubmit = async () => {
    if (!validateProfile()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  const handlePasswordSubmit = async () => {
    if (!validatePassword()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  const handleDeleteAccount = () => {
    if (window.confirm("정말 계정을 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.")) {
      console.log("계정 삭제");
    }
  };

  const getStrengthText = () => ({ weak: "약함", medium: "보통", strong: "강함" }[passwordStrength] || "");

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderLeft>
          <PageTitle>프로필 설정</PageTitle>
          <PageSubtitle>내 정보를 수정하세요</PageSubtitle>
        </PageHeaderLeft>
        <BackButton to="/profile"><FaArrowLeft /> 프로필로 돌아가기</BackButton>
      </PageHeader>

      <S.Content>
        <S.AvatarSection>
          <S.AvatarWrapper>
            <S.Avatar $image={profileForm.profileImage}>
              {!profileForm.profileImage && profileForm.name[0]}
            </S.Avatar>
            <S.AvatarOverlay>
              <FaCamera />
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </S.AvatarOverlay>
          </S.AvatarWrapper>
          <S.AvatarName>{profileForm.name || "이름 없음"}</S.AvatarName>
          <S.AvatarEmail>{dummyUser.email}</S.AvatarEmail>
          <S.AvatarStats>
            <S.StatItem><span>{dummyUser.stats.universes}</span><small>유니버스</small></S.StatItem>
            <S.StatItem><span>{dummyUser.stats.shorts}</span><small>숏폼</small></S.StatItem>
            <S.StatItem><span>{dummyUser.stats.followers.toLocaleString()}</span><small>팔로워</small></S.StatItem>
          </S.AvatarStats>
        </S.AvatarSection>

        <S.FormSection>
          <S.FormTabs>
            <S.FormTab $active={activeTab === "profile"} onClick={() => setActiveTab("profile")}>기본 정보</S.FormTab>
            <S.FormTab $active={activeTab === "password"} onClick={() => setActiveTab("password")}>비밀번호 변경</S.FormTab>
          </S.FormTabs>

          <S.FormContent>
            {showSuccess && <S.SuccessBanner><FaCheck /> 변경사항이 저장되었습니다!</S.SuccessBanner>}

            {activeTab === "profile" ? (
              <>
                <FormGroup>
                  <FormLabel>이메일</FormLabel>
                  <FormInput type="email" value={dummyUser.email} disabled />
                  <FormHint>이메일은 변경할 수 없습니다</FormHint>
                </FormGroup>

                <FormGroup>
                  <FormLabel>이름 (닉네임)</FormLabel>
                  <FormInput type="text" name="name" placeholder="이름을 입력하세요" value={profileForm.name} onChange={handleProfileChange} $hasError={!!errors.name} />
                  {errors.name && <S.ErrorText>{errors.name}</S.ErrorText>}
                </FormGroup>

                <FormGroup>
                  <FormLabel>소개</FormLabel>
                  <FormTextarea name="bio" placeholder="자신을 소개해보세요" value={profileForm.bio} onChange={handleProfileChange} />
                  <FormHint>{profileForm.bio.length}/150자</FormHint>
                  {errors.bio && <S.ErrorText>{errors.bio}</S.ErrorText>}
                </FormGroup>

                <S.FormActions>
                  <SecondaryButton onClick={() => window.location.reload()}>취소</SecondaryButton>
                  <PrimaryButton onClick={handleProfileSubmit} disabled={isLoading}>{isLoading ? <Spinner /> : "저장"}</PrimaryButton>
                </S.FormActions>

                <S.DangerZone>
                  <S.DangerTitle>위험 구역</S.DangerTitle>
                  <S.DangerText>계정을 삭제하면 모든 데이터가 영구적으로 삭제됩니다. 이 작업은 되돌릴 수 없습니다.</S.DangerText>
                  <S.DangerButton onClick={handleDeleteAccount}>계정 삭제</S.DangerButton>
                </S.DangerZone>
              </>
            ) : (
              <>
                <FormGroup>
                  <FormLabel>현재 비밀번호</FormLabel>
                  <FormInput type="password" name="currentPassword" placeholder="현재 비밀번호를 입력하세요" value={passwordForm.currentPassword} onChange={handlePasswordChange} $hasError={!!errors.currentPassword} />
                  {errors.currentPassword && <S.ErrorText>{errors.currentPassword}</S.ErrorText>}
                </FormGroup>

                <FormGroup>
                  <FormLabel>새 비밀번호</FormLabel>
                  <FormInput type="password" name="newPassword" placeholder="새 비밀번호를 입력하세요" value={passwordForm.newPassword} onChange={handlePasswordChange} $hasError={!!errors.newPassword} />
                  {passwordForm.newPassword && (
                    <S.PasswordStrength>
                      <S.StrengthBar><S.StrengthFill $strength={passwordStrength} /></S.StrengthBar>
                      <S.StrengthText $strength={passwordStrength}>비밀번호 강도: {getStrengthText()}</S.StrengthText>
                    </S.PasswordStrength>
                  )}
                  {errors.newPassword && <S.ErrorText>{errors.newPassword}</S.ErrorText>}
                </FormGroup>

                <FormGroup>
                  <FormLabel>새 비밀번호 확인</FormLabel>
                  <FormInput type="password" name="confirmPassword" placeholder="새 비밀번호를 다시 입력하세요" value={passwordForm.confirmPassword} onChange={handlePasswordChange} $hasError={!!errors.confirmPassword} />
                  {errors.confirmPassword && <S.ErrorText>{errors.confirmPassword}</S.ErrorText>}
                </FormGroup>

                <FormHint>안전한 비밀번호를 위해 8자 이상, 대문자, 숫자, 특수문자를 포함해주세요.</FormHint>

                <S.FormActions>
                  <SecondaryButton onClick={() => setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" })}>취소</SecondaryButton>
                  <PrimaryButton onClick={handlePasswordSubmit} disabled={isLoading}>{isLoading ? <Spinner /> : "비밀번호 변경"}</PrimaryButton>
                </S.FormActions>
              </>
            )}
          </S.FormContent>
        </S.FormSection>
      </S.Content>
    </PageContainer>
  );
};

export default ProfileEdit;
