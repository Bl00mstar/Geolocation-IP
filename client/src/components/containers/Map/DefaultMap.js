import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Map from './Map';

const DefaultMap = ({ data }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Object.keys(data).length !== 0 && data.constructor !== Object) {
      setLoading(false);
    }
  }, [data]);

  if (!loading) {
    return (
      <Map latitude={data.latitude} longitude={data.longitude} ip={data.ip} />
    );
  }

  return <></>;
};

DefaultMap.propTypes = {
  data: PropTypes.object,
};

export default DefaultMap;
