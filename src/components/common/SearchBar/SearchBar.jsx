import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  min-width: ${({ $minWidth }) => $minWidth || "300px"};
  transition: border-color 0.2s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 600px) {
    min-width: 100%;
  }
`;

const Input = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textMain};
  font-size: 0.95rem;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const IconWrapper = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  align-items: center;
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;

  &:hover {
    color: ${({ theme }) => theme.colors.textMain};
  }
`;

const SearchBar = ({
  value,
  onChange,
  onSearch,
  placeholder = "검색어를 입력하세요",
  minWidth,
}) => {
  const [localValue, setLocalValue] = useState(value || "");

  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange?.(newValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch?.(localValue);
    }
  };

  const handleClear = () => {
    setLocalValue("");
    onChange?.("");
    onSearch?.("");
  };

  return (
    <Container $minWidth={minWidth}>
      <IconWrapper>
        <FaSearch />
      </IconWrapper>
      <Input
        type="text"
        placeholder={placeholder}
        value={localValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {localValue && (
        <ClearButton onClick={handleClear}>
          <FaTimes />
        </ClearButton>
      )}
    </Container>
  );
};

export default SearchBar;
