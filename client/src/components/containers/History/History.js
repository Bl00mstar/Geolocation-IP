import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Pagination from './Pagination';

const History = ({ history }) => {
  const [data, setData] = useState('');

  useEffect(() => {
    if (history === null || history === undefined) {
    } else {
      if (Object.keys(history).length !== 0 && history.constructor === Object) {
        let arr = Object.keys(history)
          .reverse()
          .map((key) => {
            return history[key];
          });
        setData(arr);
      }
    }
  }, [history]);

  return (
    <StyledDiv>
      {!data ? (
        <></>
      ) : (
        <>
          <StyledTable>
            <StyledTr>
              <StyledTh>Recently searched:</StyledTh>
            </StyledTr>
            <Pagination value={data} />
          </StyledTable>
        </>
      )}
    </StyledDiv>
  );
};

History.propTypes = {
  history: PropTypes.object,
};

const mapStateToProps = (state) => ({
  history: state.history.history,
});

export default connect(mapStateToProps)(History);

const StyledTable = styled.table`
  width: 100%;
  text-align: center;
`;
const StyledTr = styled.tr`
  :last-child {
    td {
      border-bottom: 0;
    }
  }
`;

const StyledTh = styled.th`
  margin: 0;
  padding: 0.5rem;
  border-bottom: 1px solid black;
  border-right: 1px solid black;

  :last-child {
    border-right: 0;
  }
`;
const StyledDiv = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 450px;
`;
