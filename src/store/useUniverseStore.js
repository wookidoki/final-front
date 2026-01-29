// src/store/useUniverseStore.js
import { create } from "zustand";

// 기본 배경 프리셋
const BACKGROUND_PRESETS = [
  { id: "midnight", name: "Midnight", gradient: "linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #2d1b4e 100%)" },
  { id: "sunset", name: "Sunset", gradient: "linear-gradient(135deg, #1a0a2e 0%, #4a1942 50%, #16213e 100%)" },
  { id: "ocean", name: "Ocean", gradient: "linear-gradient(135deg, #0a1628 0%, #1e3a5f 50%, #0d2137 100%)" },
  { id: "forest", name: "Forest", gradient: "linear-gradient(135deg, #0a1a0a 0%, #1a3a2a 50%, #0d2818 100%)" },
  { id: "neon", name: "Neon City", gradient: "linear-gradient(135deg, #0d0015 0%, #1a0030 50%, #2a0045 100%)" },
  { id: "aurora", name: "Aurora", gradient: "linear-gradient(135deg, #020024 0%, #090979 35%, #00d4ff 100%)" },
  { id: "cherry", name: "Cherry", gradient: "linear-gradient(135deg, #1a0a0a 0%, #3d1a1a 50%, #2d0a1a 100%)" },
  { id: "galaxy", name: "Galaxy", gradient: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)" },
];

// 스티커 프리셋 (카테고리별)
const STICKER_PRESETS = {
  emoji: ["✨", "💖", "🌙", "⭐", "🔥", "💫", "🎵", "🎶", "🎤", "🎸", "💜", "💙", "💚", "💛", "🧡", "❤️", "🖤", "🤍", "💝", "💗"],
  nature: ["🌟", "🌈", "☁️", "🌸", "🍀", "🦋", "🌺", "🌻", "🌷", "🌹", "🌊", "⛅", "🌴", "🍃", "🌿"],
  objects: ["👑", "💎", "🎀", "🎈", "🎉", "🎊", "🎁", "🏆", "🥇", "🎯", "📸", "🎨", "💡", "🔮", "🪩"],
  music: ["🎵", "🎶", "🎸", "🥁", "🎹", "🎤", "🎧", "📻", "🔊", "🎺", "🎷", "🎻", "🪕", "🪘", "🎼"],
};

// 도형 프리셋
const SHAPE_PRESETS = [
  { id: "circle", name: "원", type: "circle" },
  { id: "square", name: "사각형", type: "square" },
  { id: "rounded", name: "둥근사각형", type: "rounded" },
  { id: "triangle", name: "삼각형", type: "triangle" },
  { id: "star", name: "별", type: "star" },
  { id: "heart", name: "하트", type: "heart" },
  { id: "hexagon", name: "육각형", type: "hexagon" },
  { id: "diamond", name: "다이아몬드", type: "diamond" },
];

// 색상 프리셋
const COLOR_PRESETS = [
  "#ff0080", "#ff6b6b", "#ffa502", "#ffd93d", "#6bcb77",
  "#4d96ff", "#845ef7", "#f06595", "#20c997", "#fab005",
  "#ffffff", "#e9ecef", "#adb5bd", "#495057", "#212529",
];

// 더미 플레이리스트 데이터
const DUMMY_PLAYLISTS = [
  { id: 1, title: "Midnight Vibes", trackCount: 24, coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200", creator: "NightOwl" },
  { id: 2, title: "Summer Hits 2024", trackCount: 32, coverUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200", creator: "BeachLover" },
  { id: 3, title: "K-Pop Favorites", trackCount: 45, coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200", creator: "KpopStan" },
  { id: 4, title: "Chill Lo-Fi", trackCount: 18, coverUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200", creator: "StudyBuddy" },
  { id: 5, title: "Rock Classics", trackCount: 28, coverUrl: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=200", creator: "RockFan" },
];

// 더미 음악 데이터
const DUMMY_TRACKS = [
  { id: 1, title: "Midnight City", artist: "M83", duration: "4:03", coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100" },
  { id: 2, title: "Blinding Lights", artist: "The Weeknd", duration: "3:20", coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100" },
  { id: 3, title: "Starboy", artist: "The Weeknd", duration: "3:50", coverUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=100" },
  { id: 4, title: "Dynamite", artist: "BTS", duration: "3:19", coverUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100" },
  { id: 5, title: "Pink Venom", artist: "BLACKPINK", duration: "3:07", coverUrl: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=100" },
  { id: 6, title: "Super Shy", artist: "NewJeans", duration: "2:34", coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100" },
];

// 초기 유니버스 상태
const initialUniverse = {
  id: null,
  title: "",
  description: "",
  isPublic: false,
  background: {
    type: "preset",
    value: BACKGROUND_PRESETS[0].gradient,
    presetId: "midnight",
  },
  widgets: [],
  createdAt: null,
  updatedAt: null,
};

const useUniverseStore = create((set, get) => ({
  // 현재 편집 중인 유니버스
  universe: { ...initialUniverse },

  // UI 상태
  selectedWidgetId: null,
  isPreviewMode: false,
  showGrid: true,
  zoom: 100,
  activePanel: null, // 'playlist' | 'music' | 'sticker' | 'shape' | 'settings' | null

  // 히스토리 (undo/redo)
  history: [],
  historyIndex: -1,

  // 프리셋 데이터
  backgroundPresets: BACKGROUND_PRESETS,
  stickerPresets: STICKER_PRESETS,
  shapePresets: SHAPE_PRESETS,
  colorPresets: COLOR_PRESETS,

  // 더미 데이터 (API 연동 전)
  myPlaylists: DUMMY_PLAYLISTS,
  myTracks: DUMMY_TRACKS,

  // ===== 패널 관리 =====
  setActivePanel: (panel) => set({ activePanel: panel }),
  closePanel: () => set({ activePanel: null }),
  togglePanel: (panel) => set((state) => ({
    activePanel: state.activePanel === panel ? null : panel
  })),

  // ===== 유니버스 기본 설정 =====
  setTitle: (title) => set((state) => ({
    universe: { ...state.universe, title }
  })),

  setDescription: (description) => set((state) => ({
    universe: { ...state.universe, description }
  })),

  setIsPublic: (isPublic) => set((state) => ({
    universe: { ...state.universe, isPublic }
  })),

  // ===== 배경 설정 =====
  setBackgroundPreset: (presetId) => {
    const preset = BACKGROUND_PRESETS.find(p => p.id === presetId);
    if (preset) {
      set((state) => ({
        universe: {
          ...state.universe,
          background: { type: "preset", value: preset.gradient, presetId }
        }
      }));
    }
  },

  setBackgroundColor: (color) => set((state) => ({
    universe: {
      ...state.universe,
      background: { type: "color", value: color, presetId: null }
    }
  })),

  setBackgroundGradient: (gradient) => set((state) => ({
    universe: {
      ...state.universe,
      background: { type: "gradient", value: gradient, presetId: null }
    }
  })),

  setBackgroundImage: (imageUrl) => set((state) => ({
    universe: {
      ...state.universe,
      background: { type: "image", value: imageUrl, presetId: null }
    }
  })),

  // ===== 위젯 관리 =====
  addWidget: (type, initialData = {}) => {
    const newWidget = {
      id: `widget_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      x: 100 + Math.random() * 300,
      y: 100 + Math.random() * 200,
      width: getDefaultSizeForType(type).width,
      height: getDefaultSizeForType(type).height,
      zIndex: get().universe.widgets.length + 1,
      data: {
        opacity: 1,
        rotation: 0,
        ...getDefaultDataForType(type),
        ...initialData,
      },
    };

    set((state) => {
      const newWidgets = [...state.universe.widgets, newWidget];
      return {
        universe: { ...state.universe, widgets: newWidgets },
        selectedWidgetId: newWidget.id,
      };
    });

    get().saveToHistory();
    return newWidget.id;
  },

  // 플레이리스트 위젯 추가
  addPlaylistWidget: (playlist) => {
    return get().addWidget("PLAYLIST", {
      playlistId: playlist.id,
      title: playlist.title,
      trackCount: playlist.trackCount,
      coverUrl: playlist.coverUrl,
      creator: playlist.creator,
    });
  },

  // 음악 위젯 추가
  addMusicWidget: (track) => {
    return get().addWidget("MUSIC", {
      trackId: track.id,
      title: track.title,
      artist: track.artist,
      duration: track.duration,
      coverUrl: track.coverUrl,
    });
  },

  // 도형 위젯 추가
  addShapeWidget: (shapeType, color = "#ff0080") => {
    return get().addWidget("SHAPE", {
      shapeType,
      fillColor: color,
      strokeColor: "transparent",
      strokeWidth: 0,
    });
  },

  // 스티커 위젯 추가
  addStickerWidget: (icon) => {
    return get().addWidget("STICKER", { icon });
  },

  updateWidget: (id, updates) => {
    set((state) => ({
      universe: {
        ...state.universe,
        widgets: state.universe.widgets.map((w) =>
          w.id === id ? { ...w, ...updates } : w
        ),
      },
    }));
  },

  updateWidgetData: (id, dataUpdates) => {
    set((state) => ({
      universe: {
        ...state.universe,
        widgets: state.universe.widgets.map((w) =>
          w.id === id ? { ...w, data: { ...w.data, ...dataUpdates } } : w
        ),
      },
    }));
  },

  removeWidget: (id) => {
    set((state) => ({
      universe: {
        ...state.universe,
        widgets: state.universe.widgets.filter((w) => w.id !== id),
      },
      selectedWidgetId: state.selectedWidgetId === id ? null : state.selectedWidgetId,
    }));
    get().saveToHistory();
  },

  duplicateWidget: (id) => {
    const widget = get().universe.widgets.find((w) => w.id === id);
    if (widget) {
      const newWidget = {
        ...widget,
        id: `widget_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        x: widget.x + 30,
        y: widget.y + 30,
        zIndex: get().universe.widgets.length + 1,
        data: { ...widget.data },
      };
      set((state) => ({
        universe: {
          ...state.universe,
          widgets: [...state.universe.widgets, newWidget],
        },
        selectedWidgetId: newWidget.id,
      }));
      get().saveToHistory();
    }
  },

  // 위젯 순서 변경
  bringToFront: (id) => {
    const maxZ = Math.max(...get().universe.widgets.map(w => w.zIndex || 0));
    get().updateWidget(id, { zIndex: maxZ + 1 });
  },

  sendToBack: (id) => {
    const minZ = Math.min(...get().universe.widgets.map(w => w.zIndex || 0));
    get().updateWidget(id, { zIndex: minZ - 1 });
  },

  // ===== 선택 관리 =====
  selectWidget: (id) => set({ selectedWidgetId: id }),
  clearSelection: () => set({ selectedWidgetId: null }),
  getSelectedWidget: () => {
    const { universe, selectedWidgetId } = get();
    return universe.widgets.find((w) => w.id === selectedWidgetId) || null;
  },

  // ===== UI 상태 =====
  togglePreviewMode: () => set((state) => ({
    isPreviewMode: !state.isPreviewMode,
    selectedWidgetId: null,
    activePanel: null,
  })),

  toggleGrid: () => set((state) => ({ showGrid: !state.showGrid })),
  setZoom: (zoom) => set({ zoom: Math.max(25, Math.min(200, zoom)) }),
  zoomIn: () => set((state) => ({ zoom: Math.min(200, state.zoom + 10) })),
  zoomOut: () => set((state) => ({ zoom: Math.max(25, state.zoom - 10) })),

  // ===== 히스토리 (Undo/Redo) =====
  saveToHistory: () => {
    const { universe, history, historyIndex } = get();
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(JSON.stringify(universe.widgets));
    set({
      history: newHistory.slice(-50),
      historyIndex: newHistory.length - 1,
    });
  },

  undo: () => {
    const { history, historyIndex } = get();
    if (historyIndex > 0) {
      const prevWidgets = JSON.parse(history[historyIndex - 1]);
      set((state) => ({
        universe: { ...state.universe, widgets: prevWidgets },
        historyIndex: historyIndex - 1,
        selectedWidgetId: null,
      }));
    }
  },

  redo: () => {
    const { history, historyIndex } = get();
    if (historyIndex < history.length - 1) {
      const nextWidgets = JSON.parse(history[historyIndex + 1]);
      set((state) => ({
        universe: { ...state.universe, widgets: nextWidgets },
        historyIndex: historyIndex + 1,
        selectedWidgetId: null,
      }));
    }
  },

  // ===== 저장/불러오기 =====
  createNewUniverse: () => {
    set({
      universe: { ...initialUniverse, createdAt: new Date().toISOString() },
      selectedWidgetId: null,
      history: [],
      historyIndex: -1,
      activePanel: null,
    });
  },

  loadUniverse: (universeData) => {
    set({
      universe: { ...initialUniverse, ...universeData },
      selectedWidgetId: null,
      history: [JSON.stringify(universeData.widgets || [])],
      historyIndex: 0,
      activePanel: null,
    });
  },

  exportUniverseData: () => {
    const { universe } = get();
    return {
      ...universe,
      updatedAt: new Date().toISOString(),
    };
  },

  // JSON 내보내기 (파일 다운로드용)
  exportToJSON: () => {
    const data = get().exportUniverseData();
    return JSON.stringify(data, null, 2);
  },

  // JSON 가져오기
  importFromJSON: (jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      get().loadUniverse(data);
      return true;
    } catch (e) {
      console.error("JSON 파싱 오류:", e);
      return false;
    }
  },

  resetUniverse: () => {
    set({
      universe: { ...initialUniverse },
      selectedWidgetId: null,
      history: [],
      historyIndex: -1,
      activePanel: null,
    });
  },
}));

// 위젯 타입별 기본 크기
function getDefaultSizeForType(type) {
  switch (type) {
    case "TEXT": return { width: 280, height: 60 };
    case "IMAGE": return { width: 300, height: 200 };
    case "STICKER": return { width: 80, height: 80 };
    case "PLAYLIST": return { width: 320, height: 120 };
    case "MUSIC": return { width: 300, height: 80 };
    case "SHAPE": return { width: 120, height: 120 };
    case "VIDEO": return { width: 320, height: 180 };
    case "LINK": return { width: 250, height: 60 };
    case "PROFILE": return { width: 200, height: 200 };
    case "PLAYLIST_GRID": return { width: 400, height: 300 };
    default: return { width: 200, height: 100 };
  }
}

// 위젯 타입별 기본 데이터
function getDefaultDataForType(type) {
  switch (type) {
    case "TEXT":
      return {
        text: "텍스트를 입력하세요",
        fontSize: 24,
        fontWeight: "bold",
        color: "#ffffff",
        fontFamily: "inherit",
        textAlign: "center",
        backgroundColor: "transparent",
        padding: 12,
      };
    case "IMAGE":
      return {
        url: "",
        alt: "",
        objectFit: "cover",
        borderRadius: 16,
        border: "none",
        shadow: true,
      };
    case "STICKER":
      return {
        icon: "✨",
        animation: "none", // none | bounce | pulse | spin
      };
    case "PLAYLIST":
      return {
        playlistId: null,
        title: "플레이리스트",
        trackCount: 0,
        coverUrl: "",
        creator: "",
        showTrackCount: true,
        style: "card", // card | compact | minimal
      };
    case "MUSIC":
      return {
        trackId: null,
        title: "노래 제목",
        artist: "아티스트",
        duration: "0:00",
        coverUrl: "",
        showPlayButton: true,
        style: "default", // default | compact | vinyl
      };
    case "SHAPE":
      return {
        shapeType: "circle", // circle | square | rounded | triangle | star | heart | hexagon | diamond
        fillColor: "#ff0080",
        strokeColor: "transparent",
        strokeWidth: 0,
        shadow: false,
        glow: false,
        glowColor: "#ff0080",
      };
    case "VIDEO":
      return {
        url: "",
        autoplay: false,
        loop: true,
        muted: true,
      };
    case "LINK":
      return {
        url: "",
        title: "Link",
        description: "",
        favicon: "",
      };
    case "PROFILE":
      return {
        name: "",
        bio: "",
        avatarUrl: "",
        showFollowButton: true,
      };
    case "PLAYLIST_GRID":
      return {
        playlists: [],
        columns: 2,
        showTitle: true,
      };
    default:
      return {};
  }
}

export default useUniverseStore;
