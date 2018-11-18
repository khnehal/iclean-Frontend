export const initialState = {
  driversList: [],
  driverSaved: '',
  driverErrors: [],
};

export const getDriversList = (state = initialState) => state.driversList;
export const driverSaved = (state = initialState) => state.driverSaved;
export const getDriverErrors = (state = initialState) => state.driverErrors;
