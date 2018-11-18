export const SELECTED_USER = 'SELECTED_USER';

export function USER_SELECTED(id) {
  return async (dispatch) => {
    dispatch({ type: SELECTED_USER, data: id });
  };
}
