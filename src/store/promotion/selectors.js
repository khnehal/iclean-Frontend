export const initialState = {
  promotionsList: [],
  generatedPromoCode: '',
  promotionDeleted: false,
  reloadPromotions: false,
  promotionSaved: '',
  promotionErrors: [],
};

export const getPromotionsList = (state = initialState) => state.promotionsList;
export const getGeneratedPromoCode = (state = initialState) => state.generatedPromoCode;
export const promotionDeleted = (state = initialState) => state.promotionDeleted;
export const promotionSaved = (state = initialState) => state.promotionSaved;
export const reloadPromotions = (state = initialState) => state.reloadPromotions;
export const getPromotionErrors = (state = initialState) => state.promotionErrors;
