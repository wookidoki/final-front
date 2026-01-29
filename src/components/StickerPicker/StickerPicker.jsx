import React, { useState } from "react";
import { FaTimes, FaSearch } from "react-icons/fa";
import useUniverseStore from "../../store/useUniverseStore";
import * as S from "./StickerPicker.style";

const STICKER_CATEGORIES = [
  {
    id: "popular",
    name: "인기",
    stickers: ["✨", "💖", "🔥", "💫", "⭐", "🌙", "💜", "🎵", "👑", "💎"],
  },
  {
    id: "hearts",
    name: "하트",
    stickers: ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "💝", "💗", "💓", "💕"],
  },
  {
    id: "nature",
    name: "자연",
    stickers: ["🌸", "🌺", "🌻", "🌹", "🌷", "🍀", "🌈", "☁️", "🌙", "⭐", "🦋", "🌊"],
  },
  {
    id: "music",
    name: "음악",
    stickers: ["🎵", "🎶", "🎤", "🎸", "🎹", "🥁", "🎺", "🎻", "🎧", "📻", "🔊", "🎼"],
  },
  {
    id: "celebration",
    name: "축하",
    stickers: ["🎉", "🎊", "🎁", "🎈", "🏆", "🥇", "🎯", "🎀", "🪅", "🎇", "🎆", "✨"],
  },
  {
    id: "faces",
    name: "표정",
    stickers: ["😊", "😎", "🥰", "😍", "🤩", "😘", "🥳", "😇", "🤗", "😋", "🤪", "😜"],
  },
  {
    id: "objects",
    name: "물건",
    stickers: ["📱", "💻", "📷", "🎬", "📺", "🕹️", "🎮", "💡", "🔮", "💰", "💳", "🛒"],
  },
  {
    id: "food",
    name: "음식",
    stickers: ["🍕", "🍔", "🍟", "🌭", "🍿", "🧁", "🍰", "🍩", "🍪", "☕", "🧋", "🍷"],
  },
];

const StickerPicker = ({ isOpen, onClose, onSelect }) => {
  const [activeCategory, setActiveCategory] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");
  const { addWidget } = useUniverseStore();

  if (!isOpen) return null;

  const currentCategory = STICKER_CATEGORIES.find((c) => c.id === activeCategory);

  const handleStickerClick = (sticker) => {
    addWidget("STICKER", { icon: sticker });
    if (onSelect) onSelect(sticker);
    onClose();
  };

  return (
    <S.Overlay onClick={onClose}>
      <S.Panel onClick={(e) => e.stopPropagation()}>
        <S.Header>
          <S.Title>스티커 추가</S.Title>
          <S.CloseButton onClick={onClose}>
            <FaTimes />
          </S.CloseButton>
        </S.Header>

        <S.SearchWrapper>
          <FaSearch />
          <S.SearchInput
            type="text"
            placeholder="스티커 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </S.SearchWrapper>

        <S.CategoryTabs>
          {STICKER_CATEGORIES.map((category) => (
            <S.CategoryTab
              key={category.id}
              $active={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </S.CategoryTab>
          ))}
        </S.CategoryTabs>

        <S.StickerGrid>
          {currentCategory?.stickers.map((sticker, index) => (
            <S.StickerItem
              key={`${sticker}-${index}`}
              onClick={() => handleStickerClick(sticker)}
            >
              {sticker}
            </S.StickerItem>
          ))}
        </S.StickerGrid>

        <S.RecentSection>
          <S.RecentTitle>최근 사용</S.RecentTitle>
          <S.RecentStickers>
            {["✨", "💖", "🔥", "🎵", "💜"].map((sticker, index) => (
              <S.StickerItem
                key={`recent-${index}`}
                onClick={() => handleStickerClick(sticker)}
              >
                {sticker}
              </S.StickerItem>
            ))}
          </S.RecentStickers>
        </S.RecentSection>
      </S.Panel>
    </S.Overlay>
  );
};

export default StickerPicker;
