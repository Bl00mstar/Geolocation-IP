export const addToHistory = (data) => {
  try {
    let history = sessionStorage.getItem('history');
    let historyParse = JSON.parse(history);
    let objectLength = Object.values(historyParse).length;
    historyParse['item_' + objectLength] = data;
    let historyConvertData = JSON.stringify(historyParse);
    sessionStorage.setItem('history', historyConvertData);
    return historyConvertData;
  } catch (error) {
    console.log(error);
  }
};

export const setInitialSessionStorage = () => {
  let newObj = {};
  if (typeof newObj === 'object') newObj = JSON.stringify(newObj);
  sessionStorage.setItem('history', newObj);
};
