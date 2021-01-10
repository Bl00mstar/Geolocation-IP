import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { handleRequest } from '@store/user/user.helpers';

const About = ({ clearStateErrors }) => {
  const [restrictedSubnets, setRestrictedSubnets] = useState([]);

  useEffect(() => {
    clearStateErrors();
    handleRequest('GET', `/api/subnets`).then((data) =>
      setRestrictedSubnets(data.data)
    );
  }, []);

  return (
    <StyledContainer>
      <div>
        <p>
          Website based on{' '}
          <a href="https://www.npmjs.com/package/nslookup">nslookup</a> ,{' '}
          <a href="https://leafletjs.com/">leaflet</a> and{' '}
          <a href="https://ipstack.com/">ipstack</a> solutions, written in
          nodejs & reactjs.
        </p>
        <p>The website shows the location of your ISP / VPN by default.</p>
        <p>
          Using a search engine, by entering its IP or URL (eg 8.8.8.8, https:
          //google.com) you can view the location of the ISP user / company.
        </p>
        <p>
          Below is a list of ip addresses that are reserved or private. The
          location of these addresses will not be displayed.
        </p>
        {restrictedSubnets.map((el) => (
          <div>{el}</div>
        ))}
      </div>
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
