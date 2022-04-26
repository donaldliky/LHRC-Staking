import {
  START_ACTION,
  END_ACTION,
  CONNECT_WALLET,
  DISCONNECT_WALLET,
  SHOW_TOAST,
  HIDE_TOAST
} from '../constants/actionTypes/common'

const INITIAL_STATE = {
  loading: false,
  wallet: '',
  showToast: false,
  toastMsg: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_ACTION:
      return {
        ...state,
        loading: true
      }
    case END_ACTION:
      return {
        ...state,
        loading: false
      }
    case CONNECT_WALLET:
      return {
        ...state,
        wallet: action.wallet
      }
    case DISCONNECT_WALLET:
      return {
        ...state,
        wallet: ''
      }
    case SHOW_TOAST:
      console.log('showting toast:', action.msg)
      return {
        ...state,
        showToast: true,
        toastMsg: action.msg
      }
    case HIDE_TOAST:
      return {
        ...state,
        showToast: false
      }
    default:
      return state
  }
}

export default reducer