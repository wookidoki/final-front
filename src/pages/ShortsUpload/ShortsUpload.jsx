import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCloudUploadAlt,
  FaVideo,
  FaImage,
  FaPlus,
  FaRocket,
} from "react-icons/fa";
import * as S from "./ShortsUpload.style";
import axiosInstance from "../../services/Axios/Axios"; // Axios 임포트 확인

const ShortsUpload = () => {
  const navigate = useNavigate();
  const videoInputRef = useRef(null);
  const thumbnailInputRef = useRef(null);

  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  // 에러 방지를 위해 빈 배열로 초기화 (추후 썸네일 추출 로직 구현 시 사용)
  const [autoThumbnails, setAutoThumbnails] = useState([]);
  const [selectedThumbnail, setSelectedThumbnail] = useState(-1);

  const [formData, setFormData] = useState({
    title: "",
    caption: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // 비디오 선택
  const handleVideoSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
    }
  };

  // 썸네일 선택
  const handleThumbnailSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      const url = URL.createObjectURL(file);
      setThumbnailPreview(url);
      setSelectedThumbnail(-1); // 커스텀 선택
    }
  };

  // 폼 입력 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 업로드 처리 (핵심 로직 구현)
  const handleSubmit = async () => {
    if (!videoFile || !formData.title) {
      alert("비디오와 제목은 필수입니다.");
      return;
    }

    try {
      setIsUploading(true);
      const data = new FormData();

      // 1. 비디오 파일 추가
      data.append("video", videoFile);

      // 2. 썸네일 파일 추가
      if (thumbnailFile) {
        data.append("thumbnail", thumbnailFile);
      }
      // 3. JSON 데이터 가공
      const requestDto = {
        shortFormTitle: formData.title,
        description: formData.caption,
      };

      //
      const jsonBlob = new Blob([JSON.stringify(requestDto)], {
        type: "application/json",
      });
      data.append("request", jsonBlob);

      // 4. API 요청 전송
      await axiosInstance.post("/api/shortforms", data, {
        headers: {
          // [핵심 수정] "undefined"로 설정해야 Axios의 기본 설정(application/json)을 덮어쓰고,
          // 브라우저가 자동으로 올바른 "multipart/form-data" 헤더를 생성하게 만듭니다.
          "Content-Type": undefined,
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          setUploadProgress(percentCompleted);
        },
      });

      alert("업로드가 완료되었습니다!");
      navigate("/shorts"); // 목록 페이지로 이동
    } catch (error) {
      console.error("업로드 실패:", error);
      alert("업로드 중 오류가 발생했습니다.");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>숏폼 업로드</S.Title>
        <S.Subtitle>나만의 뮤직 숏폼을 공유해보세요</S.Subtitle>
      </S.Header>

      <S.UploadContainer>
        {/* 좌측: 비디오 업로드 */}
        <S.UploadSection>
          <S.SectionTitle>
            <FaVideo /> 동영상
          </S.SectionTitle>

          <S.DropZone
            $hasFile={!!videoFile}
            onClick={() => videoInputRef.current?.click()}
          >
            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              onChange={handleVideoSelect}
            />
            {videoPreview ? (
              <S.PreviewVideo src={videoPreview} controls muted />
            ) : (
              <>
                <S.DropIcon>
                  <FaCloudUploadAlt />
                </S.DropIcon>
                <S.DropText>
                  클릭하거나 동영상을 드래그해서 업로드
                  <br />
                  <span>MP4, MOV (최대 3분)</span>
                </S.DropText>
              </>
            )}
          </S.DropZone>

          {isUploading && (
            <S.ProgressBar>
              <S.Progress $progress={uploadProgress} />
            </S.ProgressBar>
          )}
        </S.UploadSection>

        {/* 우측: 정보 입력 */}
        <S.UploadSection>
          <S.FormSection>
            <S.InputGroup>
              <S.Label>제목 *</S.Label>
              <S.Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="숏폼 제목을 입력하세요"
                maxLength={100}
              />
              <S.CharCount>{formData.title.length}/100</S.CharCount>
            </S.InputGroup>

            <S.InputGroup>
              <S.Label>설명</S.Label>
              <S.TextArea
                name="caption"
                value={formData.caption}
                onChange={handleInputChange}
                placeholder="숏폼에 대한 설명을 입력하세요 (선택)"
                maxLength={500}
              />
              <S.CharCount>{formData.caption.length}/500</S.CharCount>
            </S.InputGroup>

            <S.InputGroup>
              <S.SectionTitle>
                <FaImage /> 썸네일 선택
              </S.SectionTitle>
              <S.ThumbnailSection>
                {/* 자동 썸네일은 현재 기능이 없으므로 빈 배열 처리됨 */}
                {autoThumbnails.map((thumb, index) => (
                  <S.ThumbnailOption
                    key={index}
                    $selected={selectedThumbnail === index}
                    onClick={() => setSelectedThumbnail(index)}
                  >
                    <S.ThumbnailImg src={thumb} alt={`썸네일 ${index + 1}`} />
                  </S.ThumbnailOption>
                ))}
                <S.CustomThumbnail
                  onClick={() => thumbnailInputRef.current?.click()}
                >
                  <input
                    ref={thumbnailInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailSelect}
                    style={{ display: "none" }}
                  />
                  {thumbnailPreview ? (
                    <S.ThumbnailImg
                      src={thumbnailPreview}
                      alt="커스텀 썸네일"
                    />
                  ) : (
                    <>
                      <FaPlus />
                      <span>직접 업로드</span>
                    </>
                  )}
                </S.CustomThumbnail>
              </S.ThumbnailSection>
            </S.InputGroup>

            <S.ButtonGroup>
              <S.CancelButton onClick={() => navigate(-1)}>취소</S.CancelButton>
              <S.SubmitButton
                onClick={handleSubmit}
                disabled={!videoFile || !formData.title || isUploading}
              >
                <FaRocket />
                {isUploading ? "업로드 중..." : "업로드"}
              </S.SubmitButton>
            </S.ButtonGroup>
          </S.FormSection>
        </S.UploadSection>
      </S.UploadContainer>
    </S.Container>
  );
};

export default ShortsUpload;
