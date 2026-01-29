import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import * as S from "./SearchBar.style";

/**
 * 검색바 컴포넌트
 * @param {function} onSearch - 검색 실행 콜백 (keyword) => void
 * @param {string} placeholder - 입력 필드 플레이스홀더
 */
const SearchBar = ({ onSearch, placeholder = "검색어를 입력하세요" }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    onSearch(inputValue.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClear = () => {
    setInputValue("");
    onSearch("");
  };

  return (
    <S.Container>
      <S.InputWrapper>
        <S.Input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          $hasValue={inputValue.length > 0}
        />
        {inputValue && (
          <S.ClearButton onClick={handleClear}>
            <FaTimes />
          </S.ClearButton>
        )}
      </S.InputWrapper>
      <S.SearchButton onClick={handleSearch}>
        <FaSearch />
      </S.SearchButton>
    </S.Container>
  );
};

export default SearchBar;
