import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SearchBar from '@containers/SearchBar';
import Ellipsis from '@containers/Ellipsis';
import { handleRequest } from '@store/user/user.helpers';
import 'leaflet/dist/leaflet.css';
import { addItemToHistory } from '../../../store/history/history.action';
import { Map } from '../../containers/Map';
import { History } from '../../containers/History';

const Home = ({
  checkClientData,
  clearStateErrors,
  clientData,
  isError,
  addToHistory,
}) => {
  const [searchData, setSearchData] = useState('');
  const [searchDataUpdate, setsearchDataUpdate] = useState('');
  const [clicked, setClicked] = useState(false);
  const [errData, setErrData] = useState('');

  useEffect(() => {
    checkClientData();
    clearStateErrors();
  }, [checkClientData, clearStateErrors]);

  useEffect(() => {
    if (searchData) {
      setsearchDataUpdate(searchData);
    }
  }, [searchData]);

  const func = async (text) => {
    setClicked(true);

    try {
      await handleRequest('POST', `/api/check/${text}`, {
        type: 'api',
      })
        .then((data) => {
          if (data.data.msg) {
            setErrData({ message: data.data.msg });
          } else {
            setSearchData(data.data);
            addToHistory(text);
          }
        })
        .finally(() => {
          setClicked(false);
        });
    } catch (error) {
      setErrData({ message: error.statusText });
    }
  };

  return (
    <StyledContainer>
      <StyledRow>
        {!isError && clientData.longitude ? (
          <Map
            latitude={clientData.latitude}
            longitude={clientData.longitude}
            ip={clientData.ip}
          />
        ) : (
          <></>
        )}
        <History />
        <SearchBar handleSearch={func} errData={errData} />
        {clicked ? (
          <Ellipsis />
        ) : (
          searchDataUpdate && (
            <Map
              latitude={searchDataUpdate.latitude}
              longitude={searchDataUpdate.longitude}
              ip={searchDataUpdate.ip}
            />
          )
        )}
      </StyledRow>
    </StyledContainer>
  );
};

// Home.propTypes = {
//   clientData: PropTypes.object,
//   clientDataLoading: PropTypes.bool,
//   checkClientData: PropTypes.func,
//   clearStateErrors: PropTypes.func,
//   isError: PropTypes.bool,
// };

const mapStateToProps = (state) => {
  return {
    dataLoading: state.user.clientDataLoading,
    clientData: state.user.clientData,
    isError: state.error.isError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkClientData: () => dispatch({ type: 'DATA_LOADING' }),
    clearStateErrors: () => dispatch({ type: 'ERROR_CLEAR' }),
    addToHistory: (x) => dispatch(addItemToHistory(x)),
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
