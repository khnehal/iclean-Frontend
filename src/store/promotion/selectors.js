export const initialState = {
  promotionsList: [],
  generatedPromoCode: '',
  promotionDeleted: false,
  promotionSaved: false,
  reloadPromotions: false,
};

export const getPromotionsList = (state = initialState) => state.promotionsList;
export const getGeneratedPromoCode = (state = initialState) => state.generatedPromoCode;
export const isPromotionDeleted = (state = initialState) => state.promotionDeleted;
export const isPromotionSaved = (state = initialState) => state.promotionSaved;
export const reloadPromotions = (state = initialState) => state.reloadPromotions;
