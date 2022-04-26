import {
  ToastContainer,
  Toast
} from 'react-bootstrap'

const MyToast = ({ message, close }) => <div style={{ position: 'fixed', top: '0px', left: '0px', width: '100%', height: '100%', zIndex: '10000' }}>
  <ToastContainer position="top-end" className="p-3" >
    <Toast onClose={() => close()}>
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto"></strong>
        <small className="text-muted"></small>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  </ToastContainer>
</div>

export default MyToast