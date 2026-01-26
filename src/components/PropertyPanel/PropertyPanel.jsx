import React from "react";
import { FaTimes } from "react-icons/fa";
import * as S from "./PropertyPanel.style";

const PropertyPanel = ({ selectedWidget, onUpdate, onClose, onDelete }) => {
  if (!selectedWidget) return null;

  const handleChange = (property, value) => {
    onUpdate(selectedWidget.id, { [property]: value });
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>속성 편집</S.Title>
        <S.CloseButton onClick={onClose}>
          <FaTimes />
        </S.CloseButton>
      </S.Header>

      <S.Section>
        <S.SectionTitle>위치</S.SectionTitle>
        <S.InputGroup>
          <S.InputLabel>X</S.InputLabel>
          <S.Input
            type="number"
            value={Math.round(selectedWidget.x)}
            onChange={(e) => handleChange("x", Number(e.target.value))}
          />
        </S.InputGroup>
        <S.InputGroup>
          <S.InputLabel>Y</S.InputLabel>
          <S.Input
            type="number"
            value={Math.round(selectedWidget.y)}
            onChange={(e) => handleChange("y", Number(e.target.value))}
          />
        </S.InputGroup>
      </S.Section>

      <S.Section>
        <S.SectionTitle>크기</S.SectionTitle>
        <S.InputGroup>
          <S.InputLabel>너비</S.InputLabel>
          <S.Input
            type="number"
            value={Math.round(selectedWidget.width)}
            onChange={(e) => handleChange("width", Number(e.target.value))}
          />
        </S.InputGroup>
        <S.InputGroup>
          <S.InputLabel>높이</S.InputLabel>
          <S.Input
            type="number"
            value={Math.round(selectedWidget.height)}
            onChange={(e) => handleChange("height", Number(e.target.value))}
          />
        </S.InputGroup>
      </S.Section>

      {selectedWidget.type === "TEXT" && (
        <S.Section>
          <S.SectionTitle>텍스트</S.SectionTitle>
          <S.TextArea
            value={selectedWidget.data?.text || ""}
            onChange={(e) =>
              handleChange("data", {
                ...selectedWidget.data,
                text: e.target.value,
              })
            }
            placeholder="텍스트를 입력하세요"
          />
          <S.InputGroup>
            <S.InputLabel>폰트 크기</S.InputLabel>
            <S.Input
              type="number"
              value={selectedWidget.data?.fontSize || 16}
              onChange={(e) =>
                handleChange("data", {
                  ...selectedWidget.data,
                  fontSize: Number(e.target.value),
                })
              }
            />
          </S.InputGroup>
          <S.InputGroup>
            <S.InputLabel>색상</S.InputLabel>
            <S.ColorInput
              type="color"
              value={selectedWidget.data?.color || "#ffffff"}
              onChange={(e) =>
                handleChange("data", {
                  ...selectedWidget.data,
                  color: e.target.value,
                })
              }
            />
          </S.InputGroup>
        </S.Section>
      )}

      {selectedWidget.type === "IMAGE" && (
        <S.Section>
          <S.SectionTitle>이미지</S.SectionTitle>
          <S.InputGroup>
            <S.InputLabel>이미지 URL</S.InputLabel>
            <S.Input
              type="text"
              value={selectedWidget.data?.url || ""}
              onChange={(e) =>
                handleChange("data", {
                  ...selectedWidget.data,
                  url: e.target.value,
                })
              }
              placeholder="https://..."
            />
          </S.InputGroup>
          <S.UploadButton>파일 업로드</S.UploadButton>
        </S.Section>
      )}

      <S.Section>
        <S.SectionTitle>스타일</S.SectionTitle>
        <S.InputGroup>
          <S.InputLabel>투명도</S.InputLabel>
          <S.Slider
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={selectedWidget.data?.opacity || 1}
            onChange={(e) =>
              handleChange("data", {
                ...selectedWidget.data,
                opacity: Number(e.target.value),
              })
            }
          />
        </S.InputGroup>
        <S.InputGroup>
          <S.InputLabel>회전 (deg)</S.InputLabel>
          <S.Input
            type="number"
            value={selectedWidget.data?.rotation || 0}
            onChange={(e) =>
              handleChange("data", {
                ...selectedWidget.data,
                rotation: Number(e.target.value),
              })
            }
          />
        </S.InputGroup>
      </S.Section>

      <S.DeleteButton onClick={() => onDelete(selectedWidget.id)}>
        위젯 삭제
      </S.DeleteButton>
    </S.Container>
  );
};

export default PropertyPanel;
