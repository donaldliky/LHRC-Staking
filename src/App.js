import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Homepage from './pages/home';
// import Feature from './pages/feature/Feature'
// import Chart from './pages/chart/Chart'
// import Navbar from './pages/menu/navbar'
// import Statistics from './pages/statistics/Statistics';
import Stake from './pages/stake';
import Swap from './pages/swap'
import Preloader from './pages/Preloader'
import Toast from './pages/Toast'

function App() {
  return (
    <div>
      <Preloader />
      <Toast />
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route exact path={'/'} element={<Homepage />} />
          {/* <Route exact path={'/feature'} element={<Feature />} />
          <Route exact path={'/chart'} element={<Chart />} />
          <Route exact path='/statistics' element={<Statistics />} /> */}
          <Route path={'/stake'} element={<Stake />} />
          <Route path={'/home'} element={<Homepage />} />
          <Route path={'/swap'} element={<Swap />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
