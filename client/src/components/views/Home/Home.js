import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SearchBar from '@containers/SearchBar';
import Ellipsis from '@containers/Ellipsis';
import { DefaultMap } from '@containers/Map';
import { handleRequest } from '@store/user/user.helpers';

const Home = ({
  dataLoading,
  checkClientData,
  clearStateErrors,
  clientData,
}) => {
  const [searchData, setSearchData] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    checkClientData();
    clearStateErrors();
  }, [checkClientData, clearStateErrors]);

  const func = (text, mode) => {
    console.log(text);
    console.log(mode);
    setClicked(true);
    setSearchLoading(true);
    try {
      handleRequest('POST', `/api/check/${text}`, { type: mode }).then((data) =>
        console.log(data)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledContainer>
      <StyledRow>
        {dataLoading ? <Ellipsis /> : <DefaultMap data={clientData} />}
        <SearchBar handleSearch={func} />
        {/* {searchLoading ? <Ellipsis /> : <></>} */}
        {/* {searchData ? <DefaultMap data={searchData} /> : <Ellipsis />} */}
        {clicked && searchLoading ? <Ellipsis /> : <></>}
        {!clicked && searchData ? <DefaultMap data={searchData} /> : <></>}
      </StyledRow>
    </StyledContainer>
  );
};

Home.propTypes = {
  clientData: PropTypes.object,
  clientDataLoading: PropTypes.bool,
  checkClientData: PropTypes.func,
  clearStateErrors: PropTypes.func,
};

const mapStateToProps = (state) => ({
  dataLoading: state.user.clientDataLoading,
  clientData: state.user.clientData,
});

const mapDispatchToProps = (dispatch) => {
  return {
    checkClientData: () => dispatch({ type: 'DATA_LOADING' }),
    clearStateErrors: () => dispatch({ type: 'ERROR_CLEAR' }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);

const StyledContainer = styled.div`
  margin: 0 auto;
  max-width: 1280px;
  width: 90%;
`;
const StyledRow = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  text-align: center;
`;
