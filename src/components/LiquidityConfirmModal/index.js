import React from 'react';
import BigNumber from 'bignumber.js';

import { AiOutlineArrowDown, AiOutlinePlus } from "react-icons/ai"

// import '..//SwapConfirmModal.scss'
import '../SwapConfirmModal/SwapConfirmModal.scss'

const LiquidityConfirmModal = ({ closeModal, onDeposit }) => {
  return (
    <div>
      <div className='bodySwapConfirm'>
        <div className='cross' onClick={closeModal}>&times;</div>
        <p className='p1'>Liquidity Deposit</p>
        <p className='p2'>You Add</p>
        <div className='displayContainer'>
          <div className='circle fixed mr-2'><img src='/assets/image/CRO.png' style={{ width: '96px', height: '96px' }} alt="LHRC Coin PFP.png" /></div>
          <div className='line-items'>
            <div>9999999.999999</div>
            <div>CRO</div>
          </div>
        </div>
        <div style={{ width: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <AiOutlinePlus className='displayContainer' />
        </div>
        <div className='displayContainer'>
          <div className='circle fixed mr-2'><img src='/assets/image/LHRC Coin PFP.png' style={{ width: '96px', height: '96px' }} alt="LHRC Coin PFP.png" /></div>
          <div className='line-items'>
            <div>333333333333</div>
            <div>LHRC</div>
          </div>
        </div>
        <hr />

        <p className='p2 mt-6'>You Receive</p>
        <div className='displayContainer' style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>7777777777777</div>
            <div>LP TOKENS</div>
        </div>
       
        {/* <p className='description'>LHRC tokens received is just an etsimate. You will receive at least 4.88888 LHRC or the transaction will be canceled.</p>
        <div className='price-details'>
          <div className='swap-price-detail'>
            <div>Price</div>
            <div>0.05 LHRC / CRO</div>
          </div>

          <div className='swap-price-detail'>
            <div>Minimum Received</div>
            <div>4.88888 LHRC</div>
          </div>

          <div className='swap-price-detail'>
            <div>Price Impact</div>
            <div>&lt 0.00</div>
          </div>

          <div className='swap-price-detail'>
            <div>Liquidity Provider Fee</div>
            <div>0.9999 CRO</div>
          </div>
        </div> */}

        <div className='swapContainer'>
          <button onClick={onDeposit}>DEPOSIT LIQUIDITY</button>
        </div>
      </div>
    </div>
  )
}

export default LiquidityConfirmModal