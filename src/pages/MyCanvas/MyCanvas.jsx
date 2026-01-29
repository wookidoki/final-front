import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft, FaCog, FaEye, FaEdit, FaSave, FaShare, FaPlus, FaMusic,
  FaListUl, FaShapes, FaSmile, FaPalette, FaFont, FaImage, FaDownload,
  FaUpload, FaUndo, FaRedo, FaTrash, FaCopy, FaPlay, FaGripVertical,
  FaAlignLeft, FaAlignCenter, FaAlignRight, FaLock, FaUnlock,
  FaArrowUp, FaArrowDown, FaTimes
} from "react-icons/fa";
import useUniverseStore from "../../store/useUniverseStore";
import DragItem from "../../components/DragItem/DragItem";
import { toast } from "../../components/common/Toast";
import * as S from "./Mycanvas.style";

// 도형 SVG 컴포넌트
const ShapeSVG = ({ type, color = "#ff0080" }) => {
  switch (type) {
    case "circle":
      return <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill={color} /></svg>;
    case "square":
      return <svg viewBox="0 0 100 100"><rect x="5" y="5" width="90" height="90" fill={color} /></svg>;
    case "rounded":
      return <svg viewBox="0 0 100 100"><rect x="5" y="5" width="90" height="90" rx="15" fill={color} /></svg>;
    case "triangle":
      return <svg viewBox="0 0 100 100"><polygon points="50,5 95,95 5,95" fill={color} /></svg>;
    case "star":
      return <svg viewBox="0 0 100 100"><polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill={color} /></svg>;
    case "heart":
      return <svg viewBox="0 0 100 100"><path d="M50,88 C20,60 5,40 5,25 C5,10 20,5 35,5 C45,5 50,15 50,15 C50,15 55,5 65,5 C80,5 95,10 95,25 C95,40 80,60 50,88Z" fill={color} /></svg>;
    case "hexagon":
      return <svg viewBox="0 0 100 100"><polygon points="50,5 93,27 93,73 50,95 7,73 7,27" fill={color} /></svg>;
    case "diamond":
      return <svg viewBox="0 0 100 100"><polygon points="50,5 95,50 50,95 5,50" fill={color} /></svg>;
    default:
      return <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill={color} /></svg>;
  }
};

const MyCanvas = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const fileInputRef = useRef(null);

  const {
    universe, selectedWidgetId, isPreviewMode, showGrid, zoom,
    backgroundPresets, stickerPresets, shapePresets, colorPresets,
    myPlaylists, myTracks,
    addWidget, addPlaylistWidget, addMusicWidget, addShapeWidget, addStickerWidget,
    updateWidget, updateWidgetData, removeWidget, duplicateWidget,
    selectWidget, clearSelection, togglePreviewMode, toggleGrid,
    setZoom, undo, redo, createNewUniverse, exportUniverseData, exportToJSON,
    importFromJSON, setBackgroundPreset, setBackgroundColor, setTitle,
    setDescription, setIsPublic, saveToHistory, bringToFront, sendToBack
  } = useUniverseStore();

  const [activeTab, setActiveTab] = useState("playlist");
  const [selectedColor, setSelectedColor] = useState("#ff0080");
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (!id) createNewUniverse();
  }, [id]);

  const selectedWidget = universe.widgets.find((w) => w.id === selectedWidgetId);

  const handleCanvasClick = (e) => {
    if (e.target === e.currentTarget) clearSelection();
  };

  const handleSave = () => {
    const data = exportUniverseData();
    console.log("저장할 유니버스 데이터:", JSON.stringify(data, null, 2));
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
    toast.success(universe.isPublic ? "유니버스가 공개되었습니다!" : "유니버스가 저장되었습니다!", "발행 완료");
  };

  const handleExportJSON = () => {
    const json = exportToJSON();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `universe_${universe.title || "untitled"}_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("JSON 파일이 다운로드되었습니다");
  };

  const handleImportJSON = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const success = importFromJSON(event.target.result);
        if (success) toast.success("유니버스를 불러왔습니다");
        else toast.error("파일을 읽을 수 없습니다");
      };
      reader.readAsText(file);
    }
  };

  const getBackgroundStyle = () => {
    const { background } = universe;
    if (background.type === "image") {
      return { backgroundImage: `url(${background.value})`, backgroundSize: "cover", backgroundPosition: "center" };
    }
    return { background: background.value };
  };

  // 탭 컨텐츠 렌더링
  const renderTabContent = () => {
    switch (activeTab) {
      case "playlist":
        return (
          <>
            <S.PanelSection>
              <S.PanelSectionTitle>내 플레이리스트</S.PanelSectionTitle>
              {myPlaylists.map((playlist) => (
                <S.MediaItem key={playlist.id} onClick={() => addPlaylistWidget(playlist)}>
                  <S.MediaCover>
                    {playlist.coverUrl ? <img src={playlist.coverUrl} alt="" /> : <FaMusic />}
                  </S.MediaCover>
                  <S.MediaInfo>
                    <h5>{playlist.title}</h5>
                    <span>{playlist.trackCount}곡 · {playlist.creator}</span>
                  </S.MediaInfo>
                  <S.AddBtn><FaPlus /></S.AddBtn>
                </S.MediaItem>
              ))}
            </S.PanelSection>
          </>
        );

      case "music":
        return (
          <>
            <S.PanelSection>
              <S.PanelSectionTitle>내 음악</S.PanelSectionTitle>
              {myTracks.map((track) => (
                <S.MediaItem key={track.id} onClick={() => addMusicWidget(track)}>
                  <S.MediaCover $size="44px">
                    {track.coverUrl ? <img src={track.coverUrl} alt="" /> : <FaMusic />}
                  </S.MediaCover>
                  <S.MediaInfo>
                    <h5>{track.title}</h5>
                    <span>{track.artist} · {track.duration}</span>
                  </S.MediaInfo>
                  <S.AddBtn><FaPlus /></S.AddBtn>
                </S.MediaItem>
              ))}
            </S.PanelSection>
          </>
        );

      case "shape":
        return (
          <>
            <S.PanelSection>
              <S.PanelSectionTitle>색상 선택</S.PanelSectionTitle>
              <S.ColorGrid>
                {colorPresets.map((color) => (
                  <S.ColorBtn
                    key={color}
                    $color={color}
                    $active={selectedColor === color}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </S.ColorGrid>
            </S.PanelSection>
            <S.PanelSection>
              <S.PanelSectionTitle>도형</S.PanelSectionTitle>
              <S.ShapeGrid>
                {shapePresets.map((shape) => (
                  <S.ShapeBtn
                    key={shape.id}
                    $color={selectedColor}
                    onClick={() => addShapeWidget(shape.type, selectedColor)}
                    title={shape.name}
                  >
                    <ShapeSVG type={shape.type} color={selectedColor} />
                  </S.ShapeBtn>
                ))}
              </S.ShapeGrid>
            </S.PanelSection>
          </>
        );

      case "sticker":
        return (
          <>
            {Object.entries(stickerPresets).map(([category, stickers]) => (
              <S.StickerCategory key={category}>
                <S.StickerCategoryTitle>
                  {category === "emoji" ? "이모지" : category === "nature" ? "자연" : category === "objects" ? "오브젝트" : "음악"}
                </S.StickerCategoryTitle>
                <S.StickerGrid>
                  {stickers.map((sticker, idx) => (
                    <S.StickerBtn key={idx} onClick={() => addStickerWidget(sticker)}>
                      {sticker}
                    </S.StickerBtn>
                  ))}
                </S.StickerGrid>
              </S.StickerCategory>
            ))}
          </>
        );

      case "background":
        return (
          <>
            <S.PanelSection>
              <S.PanelSectionTitle>배경 프리셋</S.PanelSectionTitle>
              <S.BackgroundGrid>
                {backgroundPresets.map((preset) => (
                  <S.BackgroundBtn
                    key={preset.id}
                    $gradient={preset.gradient}
                    $active={universe.background.presetId === preset.id}
                    onClick={() => setBackgroundPreset(preset.id)}
                  >
                    <span>{preset.name}</span>
                  </S.BackgroundBtn>
                ))}
              </S.BackgroundGrid>
            </S.PanelSection>
            <S.PanelSection>
              <S.PanelSectionTitle>단색 배경</S.PanelSectionTitle>
              <S.ColorGrid>
                {["#0a0a0a", "#1a1a2e", "#16213e", "#1a1a1a", "#2d132c",
                  "#1e3a5f", "#0d2137", "#1a3a2a", "#2a0a3a", "#3d1a1a"].map((color) => (
                  <S.ColorBtn
                    key={color}
                    $color={color}
                    onClick={() => setBackgroundColor(color)}
                  />
                ))}
              </S.ColorGrid>
            </S.PanelSection>
            <S.PanelSection>
              <S.PanelSectionTitle>위젯 추가</S.PanelSectionTitle>
              <S.AddWidgetBtn onClick={() => addWidget("TEXT")}>
                <FaFont /> 텍스트 추가
              </S.AddWidgetBtn>
              <S.AddWidgetBtn onClick={() => addWidget("IMAGE")}>
                <FaImage /> 이미지 추가
              </S.AddWidgetBtn>
            </S.PanelSection>
            <S.PanelSection>
              <S.PanelSectionTitle>데이터 관리</S.PanelSectionTitle>
              <S.JsonButtons>
                <S.JsonBtn onClick={handleExportJSON}>
                  <FaDownload /> 내보내기
                </S.JsonBtn>
                <S.JsonBtn onClick={() => fileInputRef.current?.click()}>
                  <FaUpload /> 가져오기
                </S.JsonBtn>
              </S.JsonButtons>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                style={{ display: "none" }}
                onChange={handleImportJSON}
              />
            </S.PanelSection>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* 좌측 위젯 패널 */}
      <S.WidgetPanel $isPreviewMode={isPreviewMode}>
        <S.PanelTabs>
          <S.PanelTab $active={activeTab === "playlist"} onClick={() => setActiveTab("playlist")}>
            <FaListUl /><span>플리</span>
          </S.PanelTab>
          <S.PanelTab $active={activeTab === "music"} onClick={() => setActiveTab("music")}>
            <FaMusic /><span>음악</span>
          </S.PanelTab>
          <S.PanelTab $active={activeTab === "shape"} onClick={() => setActiveTab("shape")}>
            <FaShapes /><span>도형</span>
          </S.PanelTab>
          <S.PanelTab $active={activeTab === "sticker"} onClick={() => setActiveTab("sticker")}>
            <FaSmile /><span>스티커</span>
          </S.PanelTab>
          <S.PanelTab $active={activeTab === "background"} onClick={() => setActiveTab("background")}>
            <FaPalette /><span>배경</span>
          </S.PanelTab>
        </S.PanelTabs>
        <S.PanelContent>
          {renderTabContent()}
        </S.PanelContent>
      </S.WidgetPanel>

      {/* 상단 툴바 */}
      <S.TopBar>
        <S.TopBarLeft>
          <S.BackBtn onClick={() => navigate(-1)}><FaArrowLeft /></S.BackBtn>
          <S.UniverseTitle>
            {universe.title || "새 유니버스"}
            {!universe.isPublic && <S.PrivateBadge>비공개</S.PrivateBadge>}
          </S.UniverseTitle>
        </S.TopBarLeft>

        <S.TopBarCenter>
          <S.ToolButton onClick={undo} title="실행취소"><FaUndo /></S.ToolButton>
          <S.ToolButton onClick={redo} title="다시실행"><FaRedo /></S.ToolButton>
          <S.ToolButton onClick={toggleGrid} $active={showGrid} title="그리드"><FaGripVertical /></S.ToolButton>
          {selectedWidget && (
            <>
              <S.ToolButton onClick={() => duplicateWidget(selectedWidgetId)} title="복제"><FaCopy /></S.ToolButton>
              <S.ToolButton onClick={() => removeWidget(selectedWidgetId)} title="삭제"><FaTrash /></S.ToolButton>
            </>
          )}
        </S.TopBarCenter>

        <S.TopBarRight>
          <S.ToolButton onClick={() => setShowSettings(true)} title="설정"><FaCog /></S.ToolButton>
          <S.ToolButton $active={isPreviewMode} onClick={togglePreviewMode} title={isPreviewMode ? "편집" : "미리보기"}>
            {isPreviewMode ? <FaEdit /> : <FaEye />}
          </S.ToolButton>
          <S.SaveButton onClick={handleSave}><FaSave /><span>저장</span></S.SaveButton>
          <S.PublishButton onClick={handlePublish}><FaShare /><span>발행</span></S.PublishButton>
        </S.TopBarRight>
      </S.TopBar>

      {/* 메인 캔버스 */}
      <S.Container
        $isPreviewMode={isPreviewMode}
        $hasSelection={!!selectedWidget && !isPreviewMode}
        onClick={handleCanvasClick}
        style={getBackgroundStyle()}
      >
        {showGrid && !isPreviewMode && <S.GridOverlay />}
        {!isPreviewMode && <S.ZoomIndicator>{zoom}%</S.ZoomIndicator>}

        <S.CanvasArea $zoom={zoom}>
          {universe.widgets.filter((w) => !w.data?.hidden).map((widget) => (
            <DragItem
              key={widget.id}
              widget={widget}
              isSelected={selectedWidgetId === widget.id}
              isPreviewMode={isPreviewMode}
              onSelect={() => selectWidget(widget.id)}
              onUpdate={(updates) => updateWidget(widget.id, updates)}
              onUpdateData={(dataUpdates) => updateWidgetData(widget.id, dataUpdates)}
            />
          ))}
        </S.CanvasArea>

        {universe.widgets.length === 0 && !isPreviewMode && (
          <S.EmptyState>
            <S.EmptyIcon>🌌</S.EmptyIcon>
            <S.EmptyTitle>나만의 유니버스를 꾸며보세요!</S.EmptyTitle>
            <S.EmptyDescription>
              왼쪽 패널에서 플레이리스트, 음악, 도형, 스티커를 추가해보세요
            </S.EmptyDescription>
          </S.EmptyState>
        )}
      </S.Container>

      {/* 모바일 하단 툴바 */}
      <S.MobileToolbar $isPreviewMode={isPreviewMode}>
        <S.MobileToolBtn $active={activeTab === "playlist"} onClick={() => setActiveTab("playlist")}>
          <FaListUl /><span>플리</span>
        </S.MobileToolBtn>
        <S.MobileToolBtn $active={activeTab === "music"} onClick={() => setActiveTab("music")}>
          <FaMusic /><span>음악</span>
        </S.MobileToolBtn>
        <S.MobileToolBtn $active={activeTab === "shape"} onClick={() => setActiveTab("shape")}>
          <FaShapes /><span>도형</span>
        </S.MobileToolBtn>
        <S.MobileToolBtn $active={activeTab === "sticker"} onClick={() => setActiveTab("sticker")}>
          <FaSmile /><span>스티커</span>
        </S.MobileToolBtn>
        <S.MobileToolBtn onClick={() => setShowSettings(true)}>
          <FaCog /><span>설정</span>
        </S.MobileToolBtn>
      </S.MobileToolbar>

      {/* 설정 모달 */}
      {showSettings && (
        <SettingsModal
          universe={universe}
          onClose={() => setShowSettings(false)}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
          onPublicChange={setIsPublic}
        />
      )}

      {/* 우측 속성 편집 패널 */}
      <PropertyPanel
        widget={selectedWidget}
        isPreviewMode={isPreviewMode}
        onUpdateData={updateWidgetData}
        onRemove={removeWidget}
        onDuplicate={duplicateWidget}
        onBringToFront={bringToFront}
        onSendToBack={sendToBack}
        onClose={clearSelection}
        colorPresets={colorPresets}
        saveToHistory={saveToHistory}
      />
    </>
  );
};

// 속성 편집 패널 컴포넌트
const PropertyPanel = ({
  widget,
  isPreviewMode,
  onUpdateData,
  onRemove,
  onDuplicate,
  onBringToFront,
  onSendToBack,
  onClose,
  colorPresets,
  saveToHistory
}) => {
  if (!widget || isPreviewMode) return null;

  const handleDataChange = (key, value) => {
    onUpdateData(widget.id, { [key]: value });
  };

  const handleDataChangeAndSave = (key, value) => {
    handleDataChange(key, value);
    saveToHistory();
  };

  const getWidgetTypeName = (type) => {
    const names = {
      TEXT: "텍스트",
      IMAGE: "이미지",
      STICKER: "스티커",
      SHAPE: "도형",
      MUSIC: "음악",
      PLAYLIST: "플레이리스트",
      VIDEO: "비디오",
      LINK: "링크",
      PROFILE: "프로필",
    };
    return names[type] || type;
  };

  const renderTypeSpecificControls = () => {
    switch (widget.type) {
      case "TEXT":
        return (
          <>
            <S.PropertySection>
              <S.PropertySectionTitle>텍스트</S.PropertySectionTitle>
              <S.PropertyRow>
                <S.PropertyTextarea
                  value={widget.data?.text || ""}
                  onChange={(e) => handleDataChange("text", e.target.value)}
                  onBlur={saveToHistory}
                  placeholder="텍스트를 입력하세요"
                />
              </S.PropertyRow>
            </S.PropertySection>

            <S.PropertySection>
              <S.PropertySectionTitle>스타일</S.PropertySectionTitle>
              <S.PropertyRow>
                <S.PropertyLabel>글자 크기</S.PropertyLabel>
                <S.PropertySlider>
                  <input
                    type="range"
                    min="12"
                    max="72"
                    value={widget.data?.fontSize || 24}
                    onChange={(e) => handleDataChange("fontSize", parseInt(e.target.value))}
                    onMouseUp={saveToHistory}
                  />
                  <span>{widget.data?.fontSize || 24}px</span>
                </S.PropertySlider>
              </S.PropertyRow>
              <S.PropertyRow>
                <S.PropertyLabel>글자 굵기</S.PropertyLabel>
                <S.PropertySelect
                  value={widget.data?.fontWeight || "bold"}
                  onChange={(e) => handleDataChangeAndSave("fontWeight", e.target.value)}
                >
                  <option value="normal">일반</option>
                  <option value="500">중간</option>
                  <option value="bold">굵게</option>
                  <option value="900">아주 굵게</option>
                </S.PropertySelect>
              </S.PropertyRow>
              <S.PropertyRow>
                <S.PropertyLabel>정렬</S.PropertyLabel>
                <S.PropertyBtnGroup>
                  <S.PropertyBtn
                    $active={widget.data?.textAlign === "left"}
                    onClick={() => handleDataChangeAndSave("textAlign", "left")}
                  >
                    <FaAlignLeft />
                  </S.PropertyBtn>
                  <S.PropertyBtn
                    $active={widget.data?.textAlign === "center" || !widget.data?.textAlign}
                    onClick={() => handleDataChangeAndSave("textAlign", "center")}
                  >
                    <FaAlignCenter />
                  </S.PropertyBtn>
                  <S.PropertyBtn
                    $active={widget.data?.textAlign === "right"}
                    onClick={() => handleDataChangeAndSave("textAlign", "right")}
                  >
                    <FaAlignRight />
                  </S.PropertyBtn>
                </S.PropertyBtnGroup>
              </S.PropertyRow>
              <S.PropertyRow>
                <S.PropertyLabel>글자 색상</S.PropertyLabel>
                <S.PropertyColorPicker>
                  <input
                    type="color"
                    value={widget.data?.color || "#ffffff"}
                    onChange={(e) => handleDataChangeAndSave("color", e.target.value)}
                  />
                  <span>{widget.data?.color || "#ffffff"}</span>
                </S.PropertyColorPicker>
                <S.QuickColorRow>
                  {colorPresets.slice(0, 8).map((color) => (
                    <S.QuickColorBtn
                      key={color}
                      $color={color}
                      $active={widget.data?.color === color}
                      onClick={() => handleDataChangeAndSave("color", color)}
                    />
                  ))}
                </S.QuickColorRow>
              </S.PropertyRow>
              <S.PropertyRow>
                <S.PropertyLabel>배경 색상</S.PropertyLabel>
                <S.PropertyColorPicker>
                  <input
                    type="color"
                    value={widget.data?.backgroundColor === "transparent" ? "#000000" : (widget.data?.backgroundColor || "#000000")}
                    onChange={(e) => handleDataChangeAndSave("backgroundColor", e.target.value)}
                  />
                  <span>{widget.data?.backgroundColor || "transparent"}</span>
                </S.PropertyColorPicker>
                <S.PropertyToggle>
                  <span>배경 투명</span>
                  <S.ToggleSwitch>
                    <input
                      type="checkbox"
                      checked={widget.data?.backgroundColor === "transparent" || !widget.data?.backgroundColor}
                      onChange={(e) => handleDataChangeAndSave("backgroundColor", e.target.checked ? "transparent" : "#1a1a2e")}
                    />
                    <span className="slider" />
                  </S.ToggleSwitch>
                </S.PropertyToggle>
              </S.PropertyRow>
            </S.PropertySection>
          </>
        );

      case "IMAGE":
        return (
          <>
            <S.PropertySection>
              <S.PropertySectionTitle>이미지</S.PropertySectionTitle>
              <S.PropertyRow>
                <S.PropertyLabel>이미지 URL</S.PropertyLabel>
                <S.PropertyInput
                  value={widget.data?.url || ""}
                  onChange={(e) => handleDataChange("url", e.target.value)}
                  onBlur={saveToHistory}
                  placeholder="https://..."
                />
              </S.PropertyRow>
              <S.PropertyRow>
                <S.PropertyLabel>대체 텍스트</S.PropertyLabel>
                <S.PropertyInput
                  value={widget.data?.alt || ""}
                  onChange={(e) => handleDataChange("alt", e.target.value)}
                  onBlur={saveToHistory}
                  placeholder="이미지 설명"
                />
              </S.PropertyRow>
            </S.PropertySection>

            <S.PropertySection>
              <S.PropertySectionTitle>스타일</S.PropertySectionTitle>
              <S.PropertyRow>
                <S.PropertyLabel>모서리 둥글기</S.PropertyLabel>
                <S.PropertySlider>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={widget.data?.borderRadius || 16}
                    onChange={(e) => handleDataChange("borderRadius", parseInt(e.target.value))}
                    onMouseUp={saveToHistory}
                  />
                  <span>{widget.data?.borderRadius || 16}px</span>
                </S.PropertySlider>
              </S.PropertyRow>
              <S.PropertyRow>
                <S.PropertyLabel>맞춤</S.PropertyLabel>
                <S.PropertySelect
                  value={widget.data?.objectFit || "cover"}
                  onChange={(e) => handleDataChangeAndSave("objectFit", e.target.value)}
                >
                  <option value="cover">채우기</option>
                  <option value="contain">맞추기</option>
                  <option value="fill">늘리기</option>
                </S.PropertySelect>
              </S.PropertyRow>
              <S.PropertyToggle>
                <span>그림자</span>
                <S.ToggleSwitch>
                  <input
                    type="checkbox"
                    checked={widget.data?.shadow}
                    onChange={(e) => handleDataChangeAndSave("shadow", e.target.checked)}
                  />
                  <span className="slider" />
                </S.ToggleSwitch>
              </S.PropertyToggle>
            </S.PropertySection>
          </>
        );

      case "SHAPE":
        return (
          <>
            <S.PropertySection>
              <S.PropertySectionTitle>도형</S.PropertySectionTitle>
              <S.PropertyRow>
                <S.PropertyLabel>도형 타입</S.PropertyLabel>
                <S.PropertySelect
                  value={widget.data?.shapeType || "circle"}
                  onChange={(e) => handleDataChangeAndSave("shapeType", e.target.value)}
                >
                  <option value="circle">원</option>
                  <option value="square">사각형</option>
                  <option value="rounded">둥근사각형</option>
                  <option value="triangle">삼각형</option>
                  <option value="star">별</option>
                  <option value="heart">하트</option>
                  <option value="hexagon">육각형</option>
                  <option value="diamond">다이아몬드</option>
                </S.PropertySelect>
              </S.PropertyRow>
              <S.PropertyRow>
                <S.PropertyLabel>채우기 색상</S.PropertyLabel>
                <S.PropertyColorPicker>
                  <input
                    type="color"
                    value={widget.data?.fillColor || "#ff0080"}
                    onChange={(e) => handleDataChangeAndSave("fillColor", e.target.value)}
                  />
                  <span>{widget.data?.fillColor || "#ff0080"}</span>
                </S.PropertyColorPicker>
                <S.QuickColorRow>
                  {colorPresets.slice(0, 8).map((color) => (
                    <S.QuickColorBtn
                      key={color}
                      $color={color}
                      $active={widget.data?.fillColor === color}
                      onClick={() => handleDataChangeAndSave("fillColor", color)}
                    />
                  ))}
                </S.QuickColorRow>
              </S.PropertyRow>
              <S.PropertyRow>
                <S.PropertyLabel>테두리 색상</S.PropertyLabel>
                <S.PropertyColorPicker>
                  <input
                    type="color"
                    value={widget.data?.strokeColor === "transparent" ? "#ffffff" : (widget.data?.strokeColor || "#ffffff")}
                    onChange={(e) => handleDataChangeAndSave("strokeColor", e.target.value)}
                  />
                  <span>{widget.data?.strokeColor || "transparent"}</span>
                </S.PropertyColorPicker>
              </S.PropertyRow>
              <S.PropertyRow>
                <S.PropertyLabel>테두리 굵기</S.PropertyLabel>
                <S.PropertySlider>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={widget.data?.strokeWidth || 0}
                    onChange={(e) => handleDataChange("strokeWidth", parseInt(e.target.value))}
                    onMouseUp={saveToHistory}
                  />
                  <span>{widget.data?.strokeWidth || 0}px</span>
                </S.PropertySlider>
              </S.PropertyRow>
              <S.PropertyToggle>
                <span>글로우 효과</span>
                <S.ToggleSwitch>
                  <input
                    type="checkbox"
                    checked={widget.data?.glow}
                    onChange={(e) => handleDataChangeAndSave("glow", e.target.checked)}
                  />
                  <span className="slider" />
                </S.ToggleSwitch>
              </S.PropertyToggle>
              {widget.data?.glow && (
                <S.PropertyRow>
                  <S.PropertyLabel>글로우 색상</S.PropertyLabel>
                  <S.PropertyColorPicker>
                    <input
                      type="color"
                      value={widget.data?.glowColor || widget.data?.fillColor || "#ff0080"}
                      onChange={(e) => handleDataChangeAndSave("glowColor", e.target.value)}
                    />
                    <span>{widget.data?.glowColor || widget.data?.fillColor}</span>
                  </S.PropertyColorPicker>
                </S.PropertyRow>
              )}
            </S.PropertySection>
          </>
        );

      case "STICKER":
        return (
          <>
            <S.PropertySection>
              <S.PropertySectionTitle>스티커</S.PropertySectionTitle>
              <S.PropertyRow>
                <S.PropertyLabel>아이콘</S.PropertyLabel>
                <S.PropertyInput
                  value={widget.data?.icon || "✨"}
                  onChange={(e) => handleDataChange("icon", e.target.value)}
                  onBlur={saveToHistory}
                  style={{ fontSize: "1.5rem", textAlign: "center" }}
                />
              </S.PropertyRow>
              <S.PropertyRow>
                <S.PropertyLabel>애니메이션</S.PropertyLabel>
                <S.PropertySelect
                  value={widget.data?.animation || "none"}
                  onChange={(e) => handleDataChangeAndSave("animation", e.target.value)}
                >
                  <option value="none">없음</option>
                  <option value="float">둥둥</option>
                  <option value="bounce">통통</option>
                  <option value="pulse">펄스</option>
                  <option value="spin">회전</option>
                </S.PropertySelect>
              </S.PropertyRow>
            </S.PropertySection>
          </>
        );

      case "MUSIC":
        return (
          <>
            <S.PropertySection>
              <S.PropertySectionTitle>음악 정보</S.PropertySectionTitle>
              <S.PropertyRow>
                <S.PropertyLabel>제목</S.PropertyLabel>
                <S.PropertyInput
                  value={widget.data?.title || ""}
                  onChange={(e) => handleDataChange("title", e.target.value)}
                  onBlur={saveToHistory}
                  placeholder="노래 제목"
                />
              </S.PropertyRow>
              <S.PropertyRow>
                <S.PropertyLabel>아티스트</S.PropertyLabel>
                <S.PropertyInput
                  value={widget.data?.artist || ""}
                  onChange={(e) => handleDataChange("artist", e.target.value)}
                  onBlur={saveToHistory}
                  placeholder="아티스트"
                />
              </S.PropertyRow>
              <S.PropertyRow>
                <S.PropertyLabel>커버 이미지 URL</S.PropertyLabel>
                <S.PropertyInput
                  value={widget.data?.coverUrl || ""}
                  onChange={(e) => handleDataChange("coverUrl", e.target.value)}
                  onBlur={saveToHistory}
                  placeholder="https://..."
                />
              </S.PropertyRow>
              <S.PropertyRow>
                <S.PropertyLabel>스타일</S.PropertyLabel>
                <S.PropertySelect
                  value={widget.data?.style || "default"}
                  onChange={(e) => handleDataChangeAndSave("style", e.target.value)}
                >
                  <option value="default">기본</option>
                  <option value="compact">컴팩트</option>
                  <option value="vinyl">바이닐</option>
                </S.PropertySelect>
              </S.PropertyRow>
              <S.PropertyToggle>
                <span>재생 버튼 표시</span>
                <S.ToggleSwitch>
                  <input
                    type="checkbox"
                    checked={widget.data?.showPlayButton !== false}
                    onChange={(e) => handleDataChangeAndSave("showPlayButton", e.target.checked)}
                  />
                  <span className="slider" />
                </S.ToggleSwitch>
              </S.PropertyToggle>
            </S.PropertySection>
          </>
        );

      case "PLAYLIST":
        return (
          <>
            <S.PropertySection>
              <S.PropertySectionTitle>플레이리스트 정보</S.PropertySectionTitle>
              <S.PropertyRow>
                <S.PropertyLabel>제목</S.PropertyLabel>
                <S.PropertyInput
                  value={widget.data?.title || ""}
                  onChange={(e) => handleDataChange("title", e.target.value)}
                  onBlur={saveToHistory}
                  placeholder="플레이리스트 제목"
                />
              </S.PropertyRow>
              <S.PropertyRow>
                <S.PropertyLabel>생성자</S.PropertyLabel>
                <S.PropertyInput
                  value={widget.data?.creator || ""}
                  onChange={(e) => handleDataChange("creator", e.target.value)}
                  onBlur={saveToHistory}
                  placeholder="생성자"
                />
              </S.PropertyRow>
              <S.PropertyRow>
                <S.PropertyLabel>커버 이미지 URL</S.PropertyLabel>
                <S.PropertyInput
                  value={widget.data?.coverUrl || ""}
                  onChange={(e) => handleDataChange("coverUrl", e.target.value)}
                  onBlur={saveToHistory}
                  placeholder="https://..."
                />
              </S.PropertyRow>
              <S.PropertyRow>
                <S.PropertyLabel>스타일</S.PropertyLabel>
                <S.PropertySelect
                  value={widget.data?.style || "card"}
                  onChange={(e) => handleDataChangeAndSave("style", e.target.value)}
                >
                  <option value="card">카드</option>
                  <option value="compact">컴팩트</option>
                  <option value="minimal">미니멀</option>
                </S.PropertySelect>
              </S.PropertyRow>
              <S.PropertyToggle>
                <span>곡 수 표시</span>
                <S.ToggleSwitch>
                  <input
                    type="checkbox"
                    checked={widget.data?.showTrackCount !== false}
                    onChange={(e) => handleDataChangeAndSave("showTrackCount", e.target.checked)}
                  />
                  <span className="slider" />
                </S.ToggleSwitch>
              </S.PropertyToggle>
            </S.PropertySection>
          </>
        );

      case "VIDEO":
        return (
          <>
            <S.PropertySection>
              <S.PropertySectionTitle>비디오</S.PropertySectionTitle>
              <S.PropertyRow>
                <S.PropertyLabel>비디오 URL</S.PropertyLabel>
                <S.PropertyInput
                  value={widget.data?.url || ""}
                  onChange={(e) => handleDataChange("url", e.target.value)}
                  onBlur={saveToHistory}
                  placeholder="https://..."
                />
              </S.PropertyRow>
              <S.PropertyToggle>
                <span>자동 재생</span>
                <S.ToggleSwitch>
                  <input
                    type="checkbox"
                    checked={widget.data?.autoplay}
                    onChange={(e) => handleDataChangeAndSave("autoplay", e.target.checked)}
                  />
                  <span className="slider" />
                </S.ToggleSwitch>
              </S.PropertyToggle>
              <S.PropertyToggle>
                <span>반복 재생</span>
                <S.ToggleSwitch>
                  <input
                    type="checkbox"
                    checked={widget.data?.loop}
                    onChange={(e) => handleDataChangeAndSave("loop", e.target.checked)}
                  />
                  <span className="slider" />
                </S.ToggleSwitch>
              </S.PropertyToggle>
              <S.PropertyToggle>
                <span>음소거</span>
                <S.ToggleSwitch>
                  <input
                    type="checkbox"
                    checked={widget.data?.muted}
                    onChange={(e) => handleDataChangeAndSave("muted", e.target.checked)}
                  />
                  <span className="slider" />
                </S.ToggleSwitch>
              </S.PropertyToggle>
            </S.PropertySection>
          </>
        );

      case "LINK":
        return (
          <>
            <S.PropertySection>
              <S.PropertySectionTitle>링크</S.PropertySectionTitle>
              <S.PropertyRow>
                <S.PropertyLabel>URL</S.PropertyLabel>
                <S.PropertyInput
                  value={widget.data?.url || ""}
                  onChange={(e) => handleDataChange("url", e.target.value)}
                  onBlur={saveToHistory}
                  placeholder="https://..."
                />
              </S.PropertyRow>
              <S.PropertyRow>
                <S.PropertyLabel>제목</S.PropertyLabel>
                <S.PropertyInput
                  value={widget.data?.title || ""}
                  onChange={(e) => handleDataChange("title", e.target.value)}
                  onBlur={saveToHistory}
                  placeholder="링크 제목"
                />
              </S.PropertyRow>
            </S.PropertySection>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <S.PropertyPanel $show={!!widget && !isPreviewMode}>
      <S.PropertyHeader>
        <S.PropertyTitle>
          <h3>속성</h3>
          <S.WidgetTypeBadge>{getWidgetTypeName(widget.type)}</S.WidgetTypeBadge>
        </S.PropertyTitle>
        <S.ClosePropertyBtn onClick={onClose}><FaTimes /></S.ClosePropertyBtn>
      </S.PropertyHeader>

      <S.PropertyContent>
        {/* 위젯별 속성 */}
        {renderTypeSpecificControls()}

        {/* 공통 속성 */}
        <S.PropertySection>
          <S.PropertySectionTitle>공통</S.PropertySectionTitle>
          <S.PropertyRow>
            <S.PropertyLabel>투명도</S.PropertyLabel>
            <S.PropertySlider>
              <input
                type="range"
                min="0"
                max="100"
                value={(widget.data?.opacity ?? 1) * 100}
                onChange={(e) => handleDataChange("opacity", parseInt(e.target.value) / 100)}
                onMouseUp={saveToHistory}
              />
              <span>{Math.round((widget.data?.opacity ?? 1) * 100)}%</span>
            </S.PropertySlider>
          </S.PropertyRow>
          <S.PropertyRow>
            <S.PropertyLabel>회전</S.PropertyLabel>
            <S.PropertySlider>
              <input
                type="range"
                min="-180"
                max="180"
                value={widget.data?.rotation || 0}
                onChange={(e) => handleDataChange("rotation", parseInt(e.target.value))}
                onMouseUp={saveToHistory}
              />
              <span>{widget.data?.rotation || 0}°</span>
            </S.PropertySlider>
          </S.PropertyRow>
          <S.PropertyToggle>
            <span>위치 잠금</span>
            <S.ToggleSwitch>
              <input
                type="checkbox"
                checked={widget.data?.locked}
                onChange={(e) => handleDataChangeAndSave("locked", e.target.checked)}
              />
              <span className="slider" />
            </S.ToggleSwitch>
          </S.PropertyToggle>
        </S.PropertySection>

        {/* 레이어 순서 */}
        <S.PropertySection>
          <S.PropertySectionTitle>레이어</S.PropertySectionTitle>
          <S.PropertyBtnGroup>
            <S.PropertyBtn onClick={() => { onBringToFront(widget.id); saveToHistory(); }}>
              <FaArrowUp /> 앞으로
            </S.PropertyBtn>
            <S.PropertyBtn onClick={() => { onSendToBack(widget.id); saveToHistory(); }}>
              <FaArrowDown /> 뒤로
            </S.PropertyBtn>
          </S.PropertyBtnGroup>
        </S.PropertySection>
      </S.PropertyContent>

      <S.PropertyActions>
        <S.ActionBtn onClick={() => onDuplicate(widget.id)}>
          <FaCopy /> 복제
        </S.ActionBtn>
        <S.ActionBtn $danger onClick={() => onRemove(widget.id)}>
          <FaTrash /> 삭제
        </S.ActionBtn>
      </S.PropertyActions>
    </S.PropertyPanel>
  );
};

// 설정 모달 컴포넌트
const SettingsModal = ({ universe, onClose, onTitleChange, onDescriptionChange, onPublicChange }) => (
  <div style={{
    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
    background: "rgba(0,0,0,0.7)", zIndex: 2000,
    display: "flex", alignItems: "center", justifyContent: "center"
  }}>
    <div style={{
      width: "90%", maxWidth: "450px", background: "#1c1917",
      borderRadius: "20px", padding: "24px", border: "1px solid rgba(255,255,255,0.1)"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#fff" }}>유니버스 설정</h2>
        <button onClick={onClose} style={{
          background: "transparent", border: "none", color: "#888", fontSize: "1.5rem", cursor: "pointer"
        }}>×</button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", fontSize: "0.9rem", color: "#aaa", marginBottom: "8px" }}>유니버스 이름</label>
        <input
          type="text"
          value={universe.title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="나만의 유니버스"
          style={{
            width: "100%", padding: "14px", background: "#292524", border: "2px solid rgba(255,255,255,0.1)",
            borderRadius: "12px", color: "#fff", fontSize: "1rem"
          }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", fontSize: "0.9rem", color: "#aaa", marginBottom: "8px" }}>설명</label>
        <textarea
          value={universe.description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="유니버스에 대한 설명을 입력하세요"
          style={{
            width: "100%", padding: "14px", background: "#292524", border: "2px solid rgba(255,255,255,0.1)",
            borderRadius: "12px", color: "#fff", fontSize: "1rem", minHeight: "100px", resize: "vertical"
          }}
        />
      </div>

      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px", background: "#292524", borderRadius: "12px"
      }}>
        <span style={{ color: "#fff", fontSize: "0.95rem" }}>공개 여부</span>
        <label style={{ position: "relative", width: "50px", height: "26px", cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={universe.isPublic}
            onChange={(e) => onPublicChange(e.target.checked)}
            style={{ display: "none" }}
          />
          <span style={{
            position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
            background: universe.isPublic ? "#ff0080" : "#444",
            borderRadius: "13px", transition: "0.3s"
          }}>
            <span style={{
              position: "absolute", width: "20px", height: "20px",
              background: "#fff", borderRadius: "50%", top: "3px",
              left: universe.isPublic ? "27px" : "3px", transition: "0.3s"
            }} />
          </span>
        </label>
      </div>

      <button onClick={onClose} style={{
        width: "100%", marginTop: "24px", padding: "14px",
        background: "linear-gradient(135deg, #ff0080, #7928ca)",
        border: "none", borderRadius: "12px", color: "#fff",
        fontSize: "1rem", fontWeight: 600, cursor: "pointer"
      }}>
        완료
      </button>
    </div>
  </div>
);

export default MyCanvas;
