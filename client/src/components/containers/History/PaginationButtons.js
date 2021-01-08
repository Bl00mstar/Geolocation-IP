import React from 'react';
import styled from 'styled-components';

export default function PaginationButtons({
  currentPage,
  pageNumbers,
  goToPage,
}) {
  const ButtonLeftStart = () => (
    <StyledButton onClick={() => goToPage(1)}>
      {' '}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          fill-rule="evenodd"
          d="M4.5 3.5A.5.5 0 004 4v8a.5.5 0 001 0V4a.5.5 0 00-.5-.5z"
          clip-rule="evenodd"
        />
        <path
          fill-rule="evenodd"
          d="M5.696 8L11.5 4.633v6.734L5.696 8zm-.792-.696a.802.802 0 000 1.392l6.363 3.692c.52.302 1.233-.043 1.233-.696V4.308c0-.653-.713-.998-1.233-.696L4.904 7.304z"
          clip-rule="evenodd"
        />
      </svg>
    </StyledButton>
  );
  const ButtonLeft = () => (
    <StyledButton onClick={() => goToPage(currentPage - 1)}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          fill-rule="evenodd"
          d="M7.854 4.646a.5.5 0 010 .708L5.207 8l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z"
          clip-rule="evenodd"
        />
        <path
          fill-rule="evenodd"
          d="M4.5 8a.5.5 0 01.5-.5h6.5a.5.5 0 010 1H5a.5.5 0 01-.5-.5z"
          clip-rule="evenodd"
        />
      </svg>
    </StyledButton>
  );
  const ButtonRight = () => (
    <StyledButton onClick={() => goToPage(currentPage + 1)}>
      {' '}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          fill-rule="evenodd"
          d="M8.146 4.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L10.793 8 8.146 5.354a.5.5 0 010-.708z"
          clip-rule="evenodd"
        />
        <path
          fill-rule="evenodd"
          d="M4 8a.5.5 0 01.5-.5H11a.5.5 0 010 1H4.5A.5.5 0 014 8z"
          clip-rule="evenodd"
        />
      </svg>
    </StyledButton>
  );
  const ButtonRightLast = () => (
    <StyledButton onClick={() => goToPage(pageNumbers.length)}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          fill-rule="evenodd"
          d="M12 3.5a.5.5 0 01.5.5v8a.5.5 0 01-1 0V4a.5.5 0 01.5-.5z"
          clip-rule="evenodd"
        />
        <path
          fill-rule="evenodd"
          d="M10.804 8L5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 010 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"
          clip-rule="evenodd"
        />
      </svg>
    </StyledButton>
  );
  let buttons;

  if (currentPage === 1) {
    if (pageNumbers.length === 1) {
      buttons = <StyledDiv></StyledDiv>;
    } else if (pageNumbers.length > 2) {
      buttons = (
        <StyledDiv>
          <ButtonRight />
          <ButtonRightLast />
        </StyledDiv>
      );
    } else {
      buttons = (
        <StyledDiv>
          <ButtonRight />
        </StyledDiv>
      );
    }
  } else if (currentPage < pageNumbers.length && currentPage > 1) {
    if (currentPage === 2 && pageNumbers.length > 3) {
      buttons = (
        <StyledDiv>
          <ButtonLeft />
          <ButtonRight />
          <ButtonRightLast />
        </StyledDiv>
      );
    } else {
      buttons = (
        <StyledDiv>
          <ButtonLeft />
          <ButtonRight />
        </StyledDiv>
      );
    }
  } else {
    if (currentPage === pageNumbers.length) {
      if (currentPage - 1 === 1) {
        buttons = (
          <StyledDiv>
            <ButtonLeft />
          </StyledDiv>
        );
      } else {
        buttons = (
          <StyledDiv>
            <ButtonLeftStart />
            <ButtonLeft />
          </StyledDiv>
        );
      }
    }
  }

  return <div>{buttons}</div>;
}

const StyledDiv = styled.div`
  svg {
    padding: 9px 8px;
    width: 60px;
    height: 60px;
  }
`;

const StyledButton = styled.div`
  cursor: pointer;
  display: inline-block;
  margin-right: 10px;
  transition: 0.5s;
  :hover {
    fill: #990099;
  }
`;
