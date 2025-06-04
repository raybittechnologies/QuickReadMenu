import React from "react";
import styled from "styled-components";

const Button = ({ text, variant = "primary", className = "", onClick }) => {
  return (
    <StyledWrapper variant={variant} className={className}>
      <button className={`btn ${variant}`} onClick={onClick}>
        {text}
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .btn {
    width: auto;
    height: auto;
    margin: 0.5em;
    border: none;
    border-radius: 5px;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
    position: relative;
    z-index: 1;
    padding: 8px 16px;
    overflow: hidden;
    transition: color 0.5s;
    box-shadow: 2px 2px 12px 2px #6220fb10;
  }

  .btn::after {
    content: "";
    position: absolute;
    z-index: -1;
    left: -20%;
    right: -20%;
    top: 0;
    bottom: 0;
    transform: skewX(-45deg) scale(0, 1);
    transition: all 0.5s;
  }

  .btn:hover::after {
    transform: skewX(-45deg) scale(1, 1);
  }

  /* Primary Variant */
  .primary {
    background: #6220fb;
    border: 1px solid #6220fb;
    color: white;
  }

  .primary::after {
    background: white;
  }

  .primary:hover {
    color: #6220fb;
    border: 1px solid #6220fb;
  }

  /* Secondary Variant */
  .secondary {
    background: white;
    color: #6220fb;
    border: 1px solid #6220fb;
  }

  .secondary::after {
    background: #6220fb;
  }

  .secondary:hover {
    color: white;
  }
`;

export default Button;
