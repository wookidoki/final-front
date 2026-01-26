import React from "react";
import {
  FaFont,
  FaImage,
  FaStickyNote,
  FaMusic,
  FaVideo,
  FaHeart,
  FaStar,
  FaSmile,
} from "react-icons/fa";
import * as S from "./WidgetPanel.style";

const WidgetPanel = ({ onAddWidget }) => {
  const widgetTypes = [
    {
      type: "TEXT",
      icon: <FaFont />,
      label: "텍스트",
      color: "#ff0080",
    },
    {
      type: "IMAGE",
      icon: <FaImage />,
      label: "이미지",
      color: "#00f0ff",
    },
    {
      type: "PLAYLIST",
      icon: <FaMusic />,
      label: "플레이리스트",
      color: "#d8b4fe",
    },
    {
      type: "VIDEO",
      icon: <FaVideo />,
      label: "동영상",
      color: "#bef264",
    },
    {
      type: "STICKER",
      icon: <FaStickyNote />,
      label: "스티커",
      color: "#fbbf24",
    },
  ];

  const stickerOptions = [
    { icon: <FaHeart />, label: "하트" },
    { icon: <FaStar />, label: "별" },
    { icon: <FaSmile />, label: "이모지" },
  ];

  return (
    <S.Container>
      <S.Header>
        <S.Title>위젯 추가</S.Title>
        <S.Subtitle>클릭하거나 드래그해서 추가하세요</S.Subtitle>
      </S.Header>

      <S.Section>
        <S.SectionTitle>기본 위젯</S.SectionTitle>
        <S.WidgetGrid>
          {widgetTypes.map((widget) => (
            <S.WidgetCard
              key={widget.type}
              onClick={() => onAddWidget(widget.type)}
              $color={widget.color}
            >
              <S.WidgetIcon>{widget.icon}</S.WidgetIcon>
              <S.WidgetLabel>{widget.label}</S.WidgetLabel>
            </S.WidgetCard>
          ))}
        </S.WidgetGrid>
      </S.Section>

      <S.Section>
        <S.SectionTitle>스티커</S.SectionTitle>
        <S.StickerGrid>
          {stickerOptions.map((sticker, index) => (
            <S.StickerItem
              key={index}
              onClick={() => onAddWidget("STICKER", sticker)}
            >
              {sticker.icon}
            </S.StickerItem>
          ))}
        </S.StickerGrid>
      </S.Section>

      <S.Section>
        <S.SectionTitle>템플릿</S.SectionTitle>
        <S.TemplateList>
          <S.TemplateItem>
            <S.TemplateName>심플 레이아웃</S.TemplateName>
          </S.TemplateItem>
          <S.TemplateItem>
            <S.TemplateName>갤러리 스타일</S.TemplateName>
          </S.TemplateItem>
          <S.TemplateItem>
            <S.TemplateName>매거진 룩</S.TemplateName>
          </S.TemplateItem>
        </S.TemplateList>
      </S.Section>
    </S.Container>
  );
};

export default WidgetPanel;
