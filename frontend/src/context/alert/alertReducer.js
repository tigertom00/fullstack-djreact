import { SET_ALERT, REMOVE_ALERT } from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.paylaod];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== action.paylaod);
    default:
      return state;
  }
};
