import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ErrorLayout = ({ isError, errorMessage }) => {
  if (isError) {
    return (
      <StyledContainer>
        <StyledRow>
          <StyledAlert>
            <StyledTag>{errorMessage}</StyledTag>
          </StyledAlert>
        </StyledRow>
      </StyledContainer>
    );
  }

  return <></>;
};

ErrorLayout.propTypes = {
  isError: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export default ErrorLayout;

const StyledTag = styled.span``;
const StyledContainer = styled.div`
  margin: 0 auto;
  max-width: 1280px;
  width: 90%;
  margin-top: 20px;
`;
const StyledAlert = styled.div`
  background-color: transparent;
  border-radius: 30px;
  border-style: solid;
  border-color: #ff3333;
  box-shadow: 0 0 8px 0 #ff4d4d;
  padding: 10px;
  color: #f44336;
  margin: 0 auto;
  max-width: 450px;
`;
const StyledRow = styled.div`
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  text-align: center;
`;
