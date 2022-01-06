import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
} from './action';

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please provice all values!',
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    };
  }
  if (action.type === REGISTER_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.user.location,
      jobLocation: action.payload.user.location,
      showAlert: true,
      alertType: 'success',
      alertText: 'User Created! Redirecting...',
    };
  }
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
      isLoading: false,
    };
  }

  throw new Error(`no such action: ${action.type}`);
};

export default reducer;
