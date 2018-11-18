export const initialState = {
  itemsList: [],
  categoriesList: [],
  itemDeleted: false,
  reloadItems: false,
  itemUpdated: '',
  itemSaved: '',
  itemErrors: [],
};

export const getItemsList = (state = initialState) => state.itemsList;
export const getCategoriesList = (state = initialState) => state.categoriesList;
export const isItemDeleted = (state = initialState) => state.itemDeleted;
export const reloadItems = (state = initialState) => state.reloadItems;
export const itemUpdated = (state = initialState) => state.itemUpdated;
export const itemSaved = (state = initialState) => state.itemSaved;
export const getItemErrors = (state = initialState) => state.itemErrors;
