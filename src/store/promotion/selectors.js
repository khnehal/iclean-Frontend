export const initialState = {
  promotionsList: [],
  generatedPromoCode: '',
  promotionDeleted: false,
};

export const getPromotionsList = (state = initialState) => state.promotionsList;
export const getGeneratedPromoCode = (state = initialState) => state.generatedPromoCode;
export const promotionDeleted = (state = initialState) => state.promotionDeleted;
