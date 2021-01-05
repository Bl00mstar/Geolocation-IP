import axios from 'axios';

export const handleRequest = (method, url, data) => {
  return new Promise((resolve, reject) => {
    const requestConfig = {
      method,
      data,
      timeout: 10000,
      url,
    };
    console.log(requestConfig);
    axios(requestConfig)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        if (error.response) {
          reject(error.response);
        } else if (error.request) {
          reject(error.request);
        } else {
          reject(error);
        }
      });
  });
};
