import {
  START_ACTION,
  END_ACTION,
  CONNECT_WALLET,
  DISCONNECT_WALLET,
  SHOW_TOAST,
  HIDE_TOAST
} from '../constants/actionTypes/common'

export const startAction = () => ({ type: START_ACTION })

export const endAction = () => ({ type: END_ACTION })

export const connectWallet = wallet => ({ type: CONNECT_WALLET, wallet })

export const disconnectWallet = () => ({ type: DISCONNECT_WALLET })

export const showToast = msg => ({ type: SHOW_TOAST, msg })

export const hideToast = () => ({ type: HIDE_TOAST })