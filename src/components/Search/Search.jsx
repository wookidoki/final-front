import React, { useState } from "react";
import styled from "styled-components";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// 1. 모든 스타일드 컴포넌트를 반드시 함수(Search)보다 위에 정의하세요!
const SearchWrapper = styled.div`
  display: flex; align-items: center; height: 50px; width: 100%; max-width: 600px;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 25px; padding: 0 20px; position: relative; transition: all 0.3s ease;
  &:focus-within { border-color: ${({ theme }) => theme.colors.primary}; }
`;

const SelectBox = styled.div`
  display: flex; align-items: center; gap: 8px; padding-right: 15px;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer; min-width: 90px; user-select: none;
`;

const SelectedText = styled.span`
  font-size: 0.9rem; font-weight: 600; color: ${({ theme }) => theme.colors.textMain};
`;

const DropdownMenu = styled.ul`
  position: absolute; top: 55px; left: 20px; width: 120px; padding: 8px 0; margin: 0;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px; list-style: none; z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
`;

const DropdownItem = styled.li`
  padding: 10px 15px; font-size: 0.9rem; cursor: pointer;
  color: ${({ theme }) => theme.colors.textMain};
  &:hover { background: ${({ theme }) => theme.colors.surfaceHover}; color: ${({ theme }) => theme.colors.primary}; }
`;

const SearchInput = styled.input`
  background: none; border: none; flex: 1; margin-left: 15px; outline: none;
  font-size: 1rem; color: ${({ theme }) => theme.colors.textMain};
  &::placeholder { color: ${({ theme }) => theme.colors.textSub}; }
`;

// 2. 메인 컴포넌트 정의
const Search = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [searchType, setSearchType] = useState("노래 제목");
  const [keyword, setKeyword] = useState("");

  const handleSelect = (type) => {
    setSearchType(type);
    setIsOpen(false);
  };

  const handleSearch = () => {
    if (!keyword.trim()) return;
    const category = searchType === "노래 제목" ? "song" : "artist";
    // 인코딩하여 결과 페이지로 이동
    navigate(`/search-results?keyword=${encodeURIComponent(keyword)}&category=${category}`);
    setIsOpen(false);
  };

  const handleKeyDown = (e) => { if (e.key === "Enter") handleSearch(); };

  return (
    <SearchWrapper>
      <SelectBox onClick={() => setIsOpen(!isOpen)}>
        <SelectedText>{searchType}</SelectedText>
        <FaChevronDown 
          size={10} 
          style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: '0.2s' }} 
        />
      </SelectBox>

      <DropdownMenu $isOpen={isOpen}>
        <DropdownItem onClick={() => handleSelect("노래 제목")}>노래 제목</DropdownItem>
        <DropdownItem onClick={() => handleSelect("아티스트")}>아티스트</DropdownItem>
      </DropdownMenu>

      <SearchInput 
        placeholder={`${searchType}으로 검색해보세요`} 
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <FaSearch size={18} style={{ cursor: 'pointer' }} onClick={handleSearch} />
    </SearchWrapper>
  );
};

export default Search;