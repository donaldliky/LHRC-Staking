import { useSelector, useDispatch } from "react-redux"

import Toast from "../components/Toast"
import { hideToast } from "../actions/common";

const ToastContainer = () => {
  const { toastMsg, showToast } = useSelector((state) => state.common);
  const dispatch = useDispatch()
  return showToast && <Toast message={toastMsg} close={() => dispatch(hideToast())} />
}

export default ToastContainer