import {
  Spinner
} from 'react-bootstrap'

const Preloader = () => <div style={{ position: 'fixed', top: '0px', left: '0px', width: '100%', height: '100%', backgroundColor: '#ffffff', opacity: '0.5', zIndex: '10000' }}>
  <Spinner
    animation="border"
    variant="primary"
    style={{
      width: '50px',
      height: '50px',
      position: 'fixed',
      top: 'calc(50% - 25px)',
      left: 'calc(50% - 25px)'
    }}
  />
</div>

export default Preloader