import React from 'react';
import Menu from '../Menu';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import media from '@utils/media';
import ErrorLayout from '../ErrorLayout/ErrorLayout';

const MainLayout = ({ children, isError, errorMessage }) => (
  <MainContaier>
    <Menu />
    <ErrorLayout isError={isError} errorMessage={errorMessage} />
    <StyledMain>{children}</StyledMain>
  </MainContaier>
);

MainLayout.propTypes = {
  children: PropTypes.node,
  isError: PropTypes.bool,
  errorMessage: PropTypes.string,
};

const mapStateToProps = (state) => ({
  isError: state.error.isError,
  errorMessage: state.error.errorMessage,
});

export default connect(mapStateToProps)(MainLayout);

const MainContaier = styled.div`
  display: block;
  flex-flow: column nowrap;
`;

const StyledMain = styled.main`
  ${media.xmedium`
    width: 100%;
   height:95%;
`}
  ${media.medium`
    width: 100%;
   height:100%;
`}
${media.tablet`
    width: 100%;
   height:100%;
`}
${media.small`
width: 100%;
   height:100%;
`}
`;
