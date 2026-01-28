import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt, FaVideo, FaImage, FaPlus, FaRocket } from "react-icons/fa";
import * as S from "./ShortsUpload.style";

const ShortsUpload = () => {
  const navigate = useNavigate();
  const videoInputRef = useRef(null);
  const thumbnailInputRef = useRef(null);

  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);
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

  // 업로드 처리 (더미)
  const handleSubmit = async () => {
    if (!videoFile || !formData.title) return;

    setIsUploading(true);

    // 더미 업로드 진행
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      setUploadProgress(i);
    }

    setIsUploading(false);
    alert("숏폼이 업로드되었습니다!");
    navigate("/shorts");
  };

  // 자동 생성 썸네일 더미 데이터
  const autoThumbnails = [
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=300&fit=crop",
    "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200&h=300&fit=crop",
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=200&h=300&fit=crop",
  ];

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
                {autoThumbnails.map((thumb, index) => (
                  <S.ThumbnailOption
                    key={index}
                    $selected={selectedThumbnail === index}
                    onClick={() => setSelectedThumbnail(index)}
                  >
                    <S.ThumbnailImg src={thumb} alt={`썸네일 ${index + 1}`} />
                  </S.ThumbnailOption>
                ))}
                <S.CustomThumbnail onClick={() => thumbnailInputRef.current?.click()}>
                  <input
                    ref={thumbnailInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailSelect}
                    style={{ display: "none" }}
                  />
                  {thumbnailPreview ? (
                    <S.ThumbnailImg src={thumbnailPreview} alt="커스텀 썸네일" />
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
              <S.CancelButton onClick={() => navigate(-1)}>
                취소
              </S.CancelButton>
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
