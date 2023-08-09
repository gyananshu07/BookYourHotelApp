import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  destination: undefined,
  dates: [],
  adults: undefined,
  child: undefined,
  rooms: undefined,
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, { type, payload }) => {
  switch (type) {
    case "NEW_SEARCH":
      return payload;

    case "RESET_SEARCH":
      return INITIAL_STATE;

    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  return (
    <SearchContext.Provider
      value={{
        destination: state.destination,
        dates: state.dates,
        adults: state.adults,
        rooms: state.rooms,
        child: state.child,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
