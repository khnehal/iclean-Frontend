export const initialState = {
  itemsList: [],
  categoriesList: [],
  itemDeleted: '',
  reloadItems: false,
  itemUpdated: '',
  itemSaved: '',
  itemErrors: [],
  itemUpdateErrors: [],
};

export const getItemsList = (state = initialState) => state.itemsList;
export const getCategoriesList = (state = initialState) => state.categoriesList;
export const itemDeleted = (state = initialState) => state.itemDeleted;
export const reloadItems = (state = initialState) => state.reloadItems;
export const itemUpdated = (state = initialState) => state.itemUpdated;
export const itemSaved = (state = initialState) => state.itemSaved;
export const getItemErrors = (state = initialState) => state.itemErrors;
export const getItemUpdateErrors = (state = initialState) => state.itemUpdateErrors;
