import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SearchBar from '@containers/SearchBar';
import Ellipsis from '@containers/Ellipsis';
import { handleRequest } from '@store/user/user.helpers';
import 'leaflet/dist/leaflet.css';

import { Map } from '../../containers/Map';

const Home = ({
  dataLoading,
  checkClientData,
  clearStateErrors,
  clientData,
  isError,
}) => {
  const [searchData, setSearchData] = useState('');
  const [asd, setAsd] = useState('');
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    checkClientData();
    clearStateErrors();
  }, [checkClientData, clearStateErrors]);

  useEffect(() => {
    if (searchData) {
      console.log(searchData);
      setAsd(searchData);
    }
  }, [searchData]);

  const func = async (text, mode) => {
    console.log(text);
    console.log(mode);
    setClicked(true);

    try {
      await handleRequest('POST', `/api/check/${text}`, {
        type: mode,
      })
        .then((data) => {
          setSearchData(data.data);
        })
        .finally(() => {
          setClicked(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledContainer>
      <StyledRow>
        {!isError && clientData.length > 0 ? (
          <Map
            latitude={clientData.latitude}
            longitude={clientData.longitude}
            ip={clientData.ip}
          />
        ) : (
          <></>
        )}
        <SearchBar handleSearch={func} />
        {clicked ? (
          <Ellipsis />
        ) : (
          asd && (
            <Map
              latitude={asd.latitude}
              longitude={asd.longitude}
              ip={asd.ip}
            />
          )
        )}
      </StyledRow>
    </StyledContainer>
  );
};

Home.propTypes = {
  clientData: PropTypes.object,
  clientDataLoading: PropTypes.bool,
  checkClientData: PropTypes.func,
  clearStateErrors: PropTypes.func,
  isError: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  dataLoading: state.user.clientDataLoading,
  clientData: state.user.clientData,
  isError: state.error.isError,
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
