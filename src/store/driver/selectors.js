export const initialState = {
  driversList: [],
  driverTimeslotsList: [],
  reloadTimeslots: false,
  driverSaved: '',
  driverDeleted: '',
  driverErrors: [],
  dayoffSaved: '',
  dayoffsList: [],
  reloadDayoffs: false,
  dayoffErrors: [],
  dayoffDeleted: '',
  areasList: [],
  allAreas: {},
  areaErrors: [],
  areaSaved: '',
  reloadAreas: false,
  reloadDrivers: false,
  areaDeleted: '',
  currentDriver: {},
};

export const getDriversList = (state = initialState) => state.driversList;
export const getDriverTimeslotsList = (state = initialState) => state.driverTimeslotsList;
export const reloadDrivers = (state = initialState) => state.reloadDrivers;
export const reloadTimeslots = (state = initialState) => state.reloadTimeslots;
export const driverDeleted = (state = initialState) => state.driverDeleted;

export const driverSaved = (state = initialState) => state.driverSaved;
export const getDriverErrors = (state = initialState) => state.driverErrors;

export const getDayoffsList = (state = initialState) => state.dayoffsList;
export const dayoffSaved = (state = initialState) => state.dayoffSaved;
export const dayoffDeleted = (state = initialState) => state.dayoffDeleted;
export const getDayoffErrors = (state = initialState) => state.dayoffErrors;
export const reloadDayoffs = (state = initialState) => state.reloadDayoffs;

export const getAreasList = (state = initialState) => state.areasList;
export const getAreaErrors = (state = initialState) => state.areaErrors;
export const areaSaved = (state = initialState) => state.areaSaved;
export const reloadAreas = (state = initialState) => state.reloadAreas;
export const areaDeleted = (state = initialState) => state.areaDeleted;
export const getAllAreas = (state = initialState) => state.allAreas;
export const getCurrentDriver = (state = initialState) => state.currentDriver;
