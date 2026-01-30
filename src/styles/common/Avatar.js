import styled from "styled-components";

export const Avatar = styled.div`
  width: ${({ $size }) => $size || "42px"};
  height: ${({ $size }) => $size || "42px"};
  border-radius: 50%;
  background: ${({ $image, theme }) =>
    $image ? `url(${$image}) center/cover no-repeat` : theme.colors.gradient};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: ${({ $fontSize }) => $fontSize || "1rem"};
  flex-shrink: 0;
`;

export const AvatarGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const AvatarInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const AvatarName = styled.div`
  font-size: 0.95rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 2px;
`;

export const AvatarSubtext = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
