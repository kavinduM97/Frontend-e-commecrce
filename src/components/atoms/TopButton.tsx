import React from "react";
import styled from "styled-components";

interface TopButtonProps {
  name: string;
  onClick?: () => void;
  styles?: React.CSSProperties;
}

const TopButtonStyled = styled.button`
  font-weight: 600;
  cursor: pointer;
  padding: 10px;
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;

const TopButton: React.FC<TopButtonProps> = ({ name, onClick, styles }) => {
  return (
    <TopButtonStyled onClick={onClick} style={styles}>
      {name}
    </TopButtonStyled>
  );
};

export default TopButton;
