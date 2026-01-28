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
];

// 스티커 프리셋
const STICKER_PRESETS = [
  "✨", "💖", "🌙", "⭐", "🔥", "💫", "🎵", "🎶", "🎤", "🎸",
  "💜", "💙", "💚", "💛", "🧡", "❤️", "🖤", "🤍", "💝", "💗",
  "🌟", "🌈", "☁️", "🌸", "🍀", "🦋", "🌺", "🌻", "🌷", "🌹",
  "👑", "💎", "🎀", "🎈", "🎉", "🎊", "🎁", "🏆", "🥇", "🎯"
];

// 초기 유니버스 상태
const initialUniverse = {
  id: null,
  title: "",
  description: "",
  isPublic: false,
  background: {
    type: "preset", // preset | color | image
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

  // 히스토리 (undo/redo)
  history: [],
  historyIndex: -1,

  // 프리셋 데이터
  backgroundPresets: BACKGROUND_PRESETS,
  stickerPresets: STICKER_PRESETS,

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
          background: {
            type: "preset",
            value: preset.gradient,
            presetId,
          }
        }
      }));
    }
  },

  setBackgroundColor: (color) => set((state) => ({
    universe: {
      ...state.universe,
      background: {
        type: "color",
        value: color,
        presetId: null,
      }
    }
  })),

  setBackgroundImage: (imageUrl) => set((state) => ({
    universe: {
      ...state.universe,
      background: {
        type: "image",
        value: imageUrl,
        presetId: null,
      }
    }
  })),

  // ===== 위젯 관리 =====
  addWidget: (type, initialData = {}) => {
    const newWidget = {
      id: `widget_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      x: 150 + Math.random() * 200,
      y: 150 + Math.random() * 200,
      width: type === "TEXT" ? 250 : type === "STICKER" ? 80 : 280,
      height: type === "TEXT" ? 60 : type === "STICKER" ? 80 : type === "PLAYLIST" ? 120 : 200,
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
        x: widget.x + 20,
        y: widget.y + 20,
        zIndex: get().universe.widgets.length + 1,
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
      history: newHistory.slice(-50), // 최대 50개 보관
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
  // 새 유니버스 생성
  createNewUniverse: () => {
    set({
      universe: { ...initialUniverse, createdAt: new Date().toISOString() },
      selectedWidgetId: null,
      history: [],
      historyIndex: -1,
    });
  },

  // 유니버스 데이터 불러오기 (API 연동 시 사용)
  loadUniverse: (universeData) => {
    set({
      universe: {
        ...initialUniverse,
        ...universeData,
      },
      selectedWidgetId: null,
      history: [JSON.stringify(universeData.widgets || [])],
      historyIndex: 0,
    });
  },

  // 저장용 데이터 내보내기
  exportUniverseData: () => {
    const { universe } = get();
    return {
      ...universe,
      updatedAt: new Date().toISOString(),
    };
  },

  // 유니버스 초기화
  resetUniverse: () => {
    set({
      universe: { ...initialUniverse },
      selectedWidgetId: null,
      history: [],
      historyIndex: -1,
    });
  },
}));

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
        textAlign: "left",
      };
    case "IMAGE":
      return {
        url: "",
        alt: "",
        objectFit: "cover",
        borderRadius: 12,
      };
    case "STICKER":
      return {
        icon: "✨",
      };
    case "PLAYLIST":
      return {
        title: "My Playlist",
        artist: "Various Artists",
        coverUrl: "",
        trackCount: 0,
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
      };
    default:
      return {};
  }
}

export default useUniverseStore;
