export const initialState = {
  itemsList: [],
  categoriesList: [
    ["dry_cleaning", "Dry Cleaning"],
    ["laundry", "Laundry"],
    ["households", "Households"],
    ["fluff_and_fold", "Fluff & Fold"],
    ["dry_clean_upcharges", "Dry Clean Upcharges"],
  ],
};

export const getItemsList = (state = initialState) => state.itemsList;
export const getCategoriesList = (state = initialState) => state.categoriesList;
