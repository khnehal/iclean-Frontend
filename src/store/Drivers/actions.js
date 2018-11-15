// import {
//   getScopeAndEstimationProjectInfo,
// } from 'api/ScopeAndEstimationProjectInfo';

// import {
//   resultOK,
// } from 'api/utils';

// export const SS_PROJ_INFO = 'SS_PROJ_INFO';

// export function GET_SCOPE_AND_ESTIMATION_PROJ_INFO(pid) {
//   return async (dispatch) => {
//     const result = await getScopeAndEstimationProjectInfo(pid);
//     if (!resultOK(result)) {
//       return null;
//     }

//     dispatch({ type: SS_PROJ_INFO, data: result.data });

//     return result;
//   };
// }
