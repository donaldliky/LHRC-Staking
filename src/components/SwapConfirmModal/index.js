import React from 'react';
import BigNumber from 'bignumber.js';

import './SwapConfirmModal.scss'

const SwapConfirmModal = ({ closeModal, onSwap }) => {
  return (
    <div>
      <div className='bodySwapConfirm'>
        <div className='cross' onClick={closeModal}>&times;</div>
        <p className='p1'>Swap Confirmation</p>
        <p className='p2'>You Pay</p>
        <div className='displayContainer'>
          <div className='circle fixed mr-2'><img src='/assets/image/CRO.png' style={{ width: '96px', height: '96px' }} alt="LHRC Coin PFP.png" /></div>
          <div className='line-items'>
            <div>100.0</div>
            <div>CRO</div>
          </div>
        </div>
        <hr />
        <p className='p2 mt-6'>You Receive</p>
        <div className='displayContainer'>
          <div className='circle fixed mr-2'><img src='/assets/image/LHRC Coin PFP.png' style={{ width: '96px', height: '96px' }} alt="LHRC Coin PFP.png" /></div>
          <div className='line-items'>
            <div>100.0</div>
            <div>CRO</div>
          </div>
        </div>
        <p className='description'>LHRC tokens received is just an etsimate. You will receive at least 4.88888 LHRC or the transaction will be canceled.</p>
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
        </div>

        <div className='swapContainer'>
          <button onClick={onSwap}>CONFIRM SWAP</button>
        </div>
      </div>
    </div>
  )
}

export default SwapConfirmModal