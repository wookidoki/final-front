// src/store/useUiStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUiStore = create(
  persist(
    (set) => ({
      // ===== 테마 설정 =====
      // 현재 모드 (dark/light)
      currentMode: "dark",
      // 현재 색상 테마 (hotpink, cyber, sunset, lavender, lime, mint, custom)
      currentColorTheme: "hotpink",
      // 커스텀 색상 설정
      customColors: {
        primary: "#ff0080",
        secondary: "#d8b4fe",
        accent: "#bef264",
      },

      // 다크/라이트 모드 전환
      toggleMode: () =>
        set((state) => ({
          currentMode: state.currentMode === "dark" ? "light" : "dark",
        })),

      // 색상 테마 변경
      setColorTheme: (theme) => set({ currentColorTheme: theme }),

      // 커스텀 색상 설정
      setCustomColors: (colors) =>
        set((state) => ({
          customColors: { ...state.customColors, ...colors },
          currentColorTheme: "custom", // 커스텀 색상 설정 시 자동으로 custom 테마로 전환
        })),

      // [하위 호환성] 기존 isDarkMode와 toggleTheme
      get isDarkMode() {
        return this.currentMode === "dark";
      },
      toggleTheme: () =>
        set((state) => ({
          currentMode: state.currentMode === "dark" ? "light" : "dark",
        })),

      // ===== 캔버스 위젯 데이터 =====
      widgets: [
        {
          id: 1,
          type: "PLAYLIST",
          x: 100,
          y: 100,
          width: 320,
          height: 200,
          data: { title: "Coding Vibes", artist: "Lo-Fi Girl" },
        },
      ],

      // 위젯 추가
      addWidget: (type) =>
        set((state) => {
          const newId = Date.now();
          const newWidget = {
            id: newId,
            type,
            x: 200 + Math.random() * 100,
            y: 200 + Math.random() * 100,
            width: 200,
            height: 200,
            data: {},
          };
          return { widgets: [...state.widgets, newWidget] };
        }),

      // 위젯 업데이트
      updateWidget: (id, position) =>
        set((state) => ({
          widgets: state.widgets.map((w) =>
            w.id === id ? { ...w, ...position } : w
          ),
        })),

      // 위젯 삭제
      removeWidget: (id) =>
        set((state) => ({
          widgets: state.widgets.filter((w) => w.id !== id),
        })),
    }),
    {
      name: "music-genz-ui", // localStorage 키
      // 테마 설정만 persist (위젯은 나중에 서버에 저장)
      partialize: (state) => ({
        currentMode: state.currentMode,
        currentColorTheme: state.currentColorTheme,
        customColors: state.customColors,
      }),
    }
  )
);

export default useUiStore;
