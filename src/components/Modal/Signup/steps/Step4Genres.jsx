import React, { useMemo, useState } from "react";
import {
  StepWrap,
  Title,
  Desc,
  Chips,
  Chip,
  Hint,
  LocalError,
  FooterRow,
} from "./Step4Genres.styles";

import { ButtonGroup, Button } from "../SignupModal.styles";

// 임시 장르 목록 (원하는 만큼 추가/수정 가능)
const genres = [
  "K-POP",
  "POP",
  "HIPHOP",
  "R&B",
  "ROCK",
  "JAZZ",
  "CLASSIC",
  "EDM",
  "INDIE",
  "BALLAD",
  "OST",
  "METAL",
  "FUNK",
  "HOUSE",
  "TECHNO",
  "SOUL",
];

const Step4Genres = ({ data, setData, onNext, onBack }) => {
  const [localError, setLocalError] = useState("");

  const selected = data.genre || [];

  const canGoNext = useMemo(() => selected.length >= 1, [selected.length]);

  const toggleGenre = (genre) => {
    setLocalError("");
    setData((prev) => {
      const cur = prev.genre || [];
      const exists = cur.includes(genre);
      return {
        ...prev,
        genre: exists ? cur.filter((g) => g !== genre) : [...cur, genre],
      };
    });
  };

  const handleNext = () => {
    setLocalError("");
    if (selected.length < 1)
      return setLocalError("장르를 최소 1개 이상 선택해주세요.");
    onNext();
  };

  const clearAll = () => {
    setLocalError("");
    setData((prev) => ({ ...prev, genres: [] }));
  };

  return (
    <StepWrap>
      <div>
        <Title>장르 선택</Title>
        <Desc>좋아하는 장르를 선택해 주세요. (복수 선택 가능)</Desc>
      </div>

      <Chips>
        {genres.map((g) => (
          <Chip
            key={g}
            type="button"
            $active={selected.includes(g)}
            onClick={() => toggleGenre(g)}
          >
            {g}
          </Chip>
        ))}
      </Chips>

      <FooterRow>
        <Hint>
          선택됨: <b>{selected.length}</b>개 / 제한 없음
        </Hint>

        {selected.length > 0 && (
          <button
            type="button"
            onClick={clearAll}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              opacity: 0.75,
            }}
          >
            전체 해제
          </button>
        )}
      </FooterRow>

      {localError && <LocalError>{localError}</LocalError>}

      <ButtonGroup>
        <Button onClick={onBack}>이전</Button>
        <Button $primary disabled={!canGoNext} onClick={handleNext}>
          다음
        </Button>
      </ButtonGroup>
    </StepWrap>
  );
};

export default Step4Genres;
