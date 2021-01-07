const historyTypes = {
  ADD_ITEM: 'ADD_ITEM',
  LOAD_ITEMS: 'LOAD_ITEMS',
};

export default historyTypes;

// const [value, setValue] = useStateWithLocalStorage('myValueInLocalStorage');

// const onChange = (event) => setValue(event.target.value);

// const useStateWithLocalStorage = (sessionStorageKey) => {
//     const [value, setValue] = React.useState(
//       sessionStorage.getItem(sessionStorageKey) || ''
//     );

//     React.useEffect(() => {
//       sessionStorage.setItem(sessionStorageKey, value);
//     }, [value]);

//     return [value, setValue];
//   };
