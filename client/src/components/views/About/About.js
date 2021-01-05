import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const About = ({ clearStateErrors }) => {
  useEffect(() => {
    clearStateErrors();
  });

  return (
    <StyledContainer>
      <div>About</div>
    </StyledContainer>
  );
};
About.propTypes = {
  clearStateErrors: PropTypes.func,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    clearStateErrors: () => dispatch({ type: 'ERROR_CLEAR' }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(About);

const StyledContainer = styled.div`
  margin: 0 auto;
  max-width: 1280px;
  width: 90%;
`;
