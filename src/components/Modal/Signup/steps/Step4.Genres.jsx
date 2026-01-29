// steps/Step4Genres.jsx
import React from "react";
import {
  StepTitle,
  StepDescription,
  GenreGrid,
  GenreButton,
} from "./Step4Genres";

const Step4Genres = ({ formData, setField, genres }) => {
  const toggle = (id) => {
    const next = formData.favoriteGenres.includes(id)
      ? formData.favoriteGenres.filter((x) => x !== id)
      : [...formData.favoriteGenres, id];
    setField("favoriteGenres", next);
  };

  return (
    <>
      <StepTitle>음악 취향</StepTitle>
      <StepDescription>
        좋아하는 장르를 선택해주세요 (중복 선택 가능)
      </StepDescription>

      <GenreGrid>
        {genres.map((g) => (
          <GenreButton
            key={g.id}
            type="button"
            $selected={formData.favoriteGenres.includes(g.id)}
            onClick={() => toggle(g.id)}
          >
            <span>{g.emoji}</span>
            {g.name}
          </GenreButton>
        ))}
      </GenreGrid>
    </>
  );
};

export default Step4Genres;
