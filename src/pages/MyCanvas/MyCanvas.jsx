import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaCog,
  FaEye,
  FaEdit,
  FaSave,
  FaShare,
} from "react-icons/fa";
import useUniverseStore from "../../store/useUniverseStore";
import DragItem from "../../components/DragItem/DragItem";
import LayerPanel from "../../components/LayerPanel/LayerPanel";
import PropertyPanel from "../../components/PropertyPanel/PropertyPanel";
import EditorToolbar from "../../components/EditorToolbar/EditorToolbar";
import UniverseSettingsPanel from "../../components/UniverseSettingsPanel";
import StickerPicker from "../../components/StickerPicker";
import { toast } from "../../components/common/Toast";
import * as S from "./MyCanvas.style";

const MyCanvas = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    universe,
    selectedWidgetId,
    isPreviewMode,
    showGrid,
    zoom,
    addWidget,
    updateWidget,
    updateWidgetData,
    removeWidget,
    selectWidget,
    clearSelection,
    togglePreviewMode,
    toggleGrid,
    setZoom,
    undo,
    redo,
    createNewUniverse,
    exportUniverseData,
    saveToHistory,
  } = useUniverseStore();

  const [currentTool, setCurrentTool] = useState("select");
  const [showSettings, setShowSettings] = useState(false);
  const [showStickerPicker, setShowStickerPicker] = useState(false);

  // 새 유니버스 생성 또는 기존 유니버스 불러오기
  useEffect(() => {
    if (!id) {
      // 새 유니버스 생성 모드
      createNewUniverse();
    }
    // TODO: id가 있으면 API에서 유니버스 데이터 불러오기
  }, [id]);

  const selectedWidget = universe.widgets.find((w) => w.id === selectedWidgetId);

  const handleWidgetClick = (widget) => {
    if (!isPreviewMode) {
      selectWidget(widget.id);
    }
  };

  const handlePropertyUpdate = (id, updates) => {
    if (updates.data) {
      updateWidgetData(id, updates.data);
    } else {
      updateWidget(id, updates);
    }
  };

  const handleDelete = (id) => {
    removeWidget(id);
  };

  const handleCanvasClick = (e) => {
    if (e.target === e.currentTarget) {
      clearSelection();
    }
  };

  const handleToggleVisibility = (id) => {
    const widget = universe.widgets.find((w) => w.id === id);
    if (widget) {
      updateWidgetData(id, { hidden: !widget.data?.hidden });
    }
  };

  const handleToggleLock = (id) => {
    const widget = universe.widgets.find((w) => w.id === id);
    if (widget) {
      updateWidgetData(id, { locked: !widget.data?.locked });
    }
  };

  const handleToolClick = (toolId) => {
    setCurrentTool(toolId);
    if (toolId === "sticker") {
      setShowStickerPicker(true);
    } else if (toolId !== "select") {
      addWidget(toolId.toUpperCase());
      setTimeout(() => setCurrentTool("select"), 100);
    }
  };

  const handleSave = () => {
    const data = exportUniverseData();
    console.log("저장할 데이터:", data);

    // TODO: API 연동 시 서버에 저장
    toast.success("유니버스가 저장되었습니다!", "저장 완료");
  };

  const handlePublish = () => {
    if (!universe.title) {
      toast.error("유니버스 이름을 입력해주세요", "알림");
      setShowSettings(true);
      return;
    }

    const data = exportUniverseData();
    console.log("발행할 데이터:", data);

    // TODO: API 연동 시 서버에 저장 및 공개
    toast.success(
      universe.isPublic ? "유니버스가 공개되었습니다!" : "유니버스가 저장되었습니다!",
      "발행 완료"
    );
  };

  // 배경 스타일 계산
  const getBackgroundStyle = () => {
    const { background } = universe;
    if (background.type === "image") {
      return {
        backgroundImage: `url(${background.value})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    }
    return {
      background: background.value,
    };
  };

  return (
    <>
      {/* 좌측 사이드바 - 레이어 패널 */}
      {!isPreviewMode && (
        <LayerPanel
          widgets={universe.widgets}
          selectedWidget={selectedWidget}
          onSelectWidget={handleWidgetClick}
          onToggleVisibility={handleToggleVisibility}
          onToggleLock={handleToggleLock}
        />
      )}

      {/* 상단 툴바 */}
      <S.TopBar>
        <S.TopBarLeft>
          <S.BackBtn onClick={() => navigate(-1)}>
            <FaArrowLeft />
          </S.BackBtn>
          <S.UniverseTitle>
            {universe.title || "새 유니버스"}
            {!universe.isPublic && <S.PrivateBadge>비공개</S.PrivateBadge>}
          </S.UniverseTitle>
        </S.TopBarLeft>

        <S.TopBarCenter>
          {!isPreviewMode && (
            <EditorToolbar
              currentTool={currentTool}
              onToolChange={handleToolClick}
              onAddWidget={addWidget}
              onSave={handleSave}
              onUndo={undo}
              onRedo={redo}
            />
          )}
        </S.TopBarCenter>

        <S.TopBarRight>
          <S.ToolButton
            onClick={() => setShowSettings(true)}
            title="유니버스 설정"
          >
            <FaCog />
          </S.ToolButton>

          <S.ToolButton
            $active={isPreviewMode}
            onClick={togglePreviewMode}
            title={isPreviewMode ? "편집 모드" : "미리보기"}
          >
            {isPreviewMode ? <FaEdit /> : <FaEye />}
          </S.ToolButton>

          <S.SaveButton onClick={handleSave}>
            <FaSave />
            <span>저장</span>
          </S.SaveButton>

          <S.PublishButton onClick={handlePublish}>
            <FaShare />
            <span>발행</span>
          </S.PublishButton>
        </S.TopBarRight>
      </S.TopBar>

      {/* 우측 사이드바 - 속성 편집 패널 */}
      {!isPreviewMode && selectedWidget && (
        <PropertyPanel
          selectedWidget={selectedWidget}
          onUpdate={handlePropertyUpdate}
          onClose={clearSelection}
          onDelete={handleDelete}
        />
      )}

      {/* 메인 캔버스 영역 */}
      <S.Container
        $isPreviewMode={isPreviewMode}
        onClick={handleCanvasClick}
        style={getBackgroundStyle()}
      >
        {/* 그리드 배경 */}
        {showGrid && !isPreviewMode && <S.GridOverlay />}

        {/* 줌 표시 */}
        {!isPreviewMode && (
          <S.ZoomIndicator>
            {zoom}%
          </S.ZoomIndicator>
        )}

        {/* 캔버스 영역: 위젯들 */}
        <S.CanvasArea $zoom={zoom}>
          {universe.widgets
            .filter((w) => !w.data?.hidden)
            .map((widget) => (
              <DragItem
                key={widget.id}
                widget={widget}
                isSelected={selectedWidgetId === widget.id}
                isPreviewMode={isPreviewMode}
                onSelect={() => handleWidgetClick(widget)}
              />
            ))}
        </S.CanvasArea>

        {/* 빈 상태 표시 */}
        {universe.widgets.length === 0 && !isPreviewMode && (
          <S.EmptyState>
            <S.EmptyIcon>🌌</S.EmptyIcon>
            <S.EmptyTitle>유니버스를 꾸며보세요!</S.EmptyTitle>
            <S.EmptyDescription>
              상단 툴바에서 텍스트, 이미지, 스티커 등을 추가해보세요
            </S.EmptyDescription>
          </S.EmptyState>
        )}
      </S.Container>

      {/* 유니버스 설정 패널 */}
      <UniverseSettingsPanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />

      {/* 스티커 선택 패널 */}
      <StickerPicker
        isOpen={showStickerPicker}
        onClose={() => setShowStickerPicker(false)}
      />
    </>
  );
};

export default MyCanvas;
