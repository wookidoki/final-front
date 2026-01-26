import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import useUiStore from "../../store/useUiStore"; // 경로 주의 (2단계 위로)
import DragItem from "../../components/DragItem/DragItem";
import LayerPanel from "../../components/LayerPanel/LayerPanel";
import PropertyPanel from "../../components/PropertyPanel/PropertyPanel";
import EditorToolbar from "../../components/EditorToolbar/EditorToolbar";
import { toast } from "../../components/common/Toast";

// 스타일 불러오기
import * as S from "./MyCanvas.style";

const MyCanvas = () => {
  const { widgets, addWidget, updateWidget, removeWidget } = useUiStore();
  const [selectedWidget, setSelectedWidget] = useState(null);
  const [currentTool, setCurrentTool] = useState("select");

  const handleWidgetClick = (widget) => {
    setSelectedWidget(widget);
  };

  const handlePropertyUpdate = (id, updates) => {
    updateWidget(id, updates);
    // 업데이트된 위젯 정보로 선택 상태 갱신
    const updatedWidget = widgets.find((w) => w.id === id);
    if (updatedWidget) {
      setSelectedWidget({ ...updatedWidget, ...updates });
    }
  };

  const handleDelete = (id) => {
    removeWidget(id);
    setSelectedWidget(null);
  };

  const handleCanvasClick = (e) => {
    // 캔버스 배경 클릭시 선택 해제
    if (e.target === e.currentTarget) {
      setSelectedWidget(null);
    }
  };

  const handleToggleVisibility = (id) => {
    const widget = widgets.find((w) => w.id === id);
    updateWidget(id, {
      data: { ...widget.data, hidden: !widget.data?.hidden },
    });
  };

  const handleToggleLock = (id) => {
    const widget = widgets.find((w) => w.id === id);
    updateWidget(id, {
      data: { ...widget.data, locked: !widget.data?.locked },
    });
  };

  const handleSave = () => {
    console.log("저장:", widgets);
    toast.success("유니버스가 저장되었습니다!", "저장 완료");
  };

  return (
    <>
      {/* 좌측 사이드바 - 레이어 패널 */}
      <LayerPanel
        widgets={widgets}
        selectedWidget={selectedWidget}
        onSelectWidget={handleWidgetClick}
        onToggleVisibility={handleToggleVisibility}
        onToggleLock={handleToggleLock}
      />

      {/* 상단 툴바 */}
      <EditorToolbar
        currentTool={currentTool}
        onToolChange={setCurrentTool}
        onAddWidget={addWidget}
        onSave={handleSave}
      />

      {/* 우측 사이드바 - 속성 편집 패널 */}
      {selectedWidget && (
        <PropertyPanel
          selectedWidget={selectedWidget}
          onUpdate={handlePropertyUpdate}
          onClose={() => setSelectedWidget(null)}
          onDelete={handleDelete}
        />
      )}

      <S.Container onClick={handleCanvasClick}>
        {/* 뒤로가기 버튼 */}
        <S.BackBtn to="/">
          <FaArrowLeft />
        </S.BackBtn>

        {/* 그리드 배경 */}
        <S.GridOverlay />

        {/* 캔버스 영역: 실제 위젯들이 그려지는 곳 */}
        {widgets
          .filter((w) => !w.data?.hidden)
          .map((widget) => (
            <DragItem
              key={widget.id}
              widget={widget}
              isSelected={selectedWidget?.id === widget.id}
              onSelect={() => handleWidgetClick(widget)}
            />
          ))}
      </S.Container>
    </>
  );
};

export default MyCanvas;
