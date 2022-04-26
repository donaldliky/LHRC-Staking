import React from 'react';
import BigNumber from 'bignumber.js';

import './success.scss'

const Success = ({ closeModal, modalType, unstakeNft, onClickViewStakedTokens, harvestRewards, harvestingReward, stakeAmount, decimals, unstaked, staked, stakedTokensFlag, tokenSwitch }) => {
    return (
        <div>
            <div className='bodySuccess'>
                <div className='cross' onClick={closeModal}>&times;</div>
                <p className='p1'>Success!</p>
                {
                    modalType === 'stake' ? (
                        <div>
                            {
                                stakedTokensFlag ? <p className='p2'>{stakeAmount} {tokenSwitch === 'lhlrc' ? 'LHRC' : "LP"} Tokens have been added to your original stake.</p> : <p className='p2'>Your {stakeAmount} {tokenSwitch === 'lhrc' ? 'LHRC' : 'LP'} Tokens have been staked.</p>
                            }
                        </div>
                    ) : (modalType === 'harvest' ? (
                        <div>
                            <p className='p2'>You’ve just harvested {BigNumber(harvestingReward).dividedBy(BigNumber(10).exponentiatedBy(decimals)).toFixed(2)} LHRC Rewards.<br />
                                Transaction Fee (.5%) = {BigNumber(harvestingReward).dividedBy(BigNumber(20)).dividedBy(BigNumber(10).exponentiatedBy(decimals)).toFixed(2)} LHRC
                            </p>
                        </div>
                    ) : (
                        modalType === 'unstake' ? <div>
                            <p className='p2'>
                                You’ve just unstaked {BigNumber(unstaked).dividedBy(BigNumber(10).exponentiatedBy(decimals)).toFixed(2)} {tokenSwitch === 'lhrc' ? 'LHRC' : 'LP'} and harvested {BigNumber(harvestingReward).dividedBy(BigNumber(10).exponentiatedBy(decimals)).toFixed(2)} {stakeAmount} {tokenSwitch === 'lhrc' ? 'LHRC' : 'LP'} Rewards.<br />
                                Transaction Fee (.5% * {BigNumber(harvestingReward).dividedBy(BigNumber(10).exponentiatedBy(decimals)).toFixed(2)} Rewards) = {BigNumber(harvestingReward).dividedBy(BigNumber(10).exponentiatedBy(decimals)).dividedBy(BigNumber(20)).toFixed(2)} LHRC<br />
                                {
                                    staked[0] > 0 && `Barn Cat #${staked[0]} has been returned to your wallet.`
                                }
                                {
                                    staked[1] > 0 && <br />
                                }
                                {
                                    staked[1] > 0 && `Pony #${staked[1]} has been returned to your wallet.`
                                }
                                {
                                    staked[2] > 0 && <br />
                                }
                                {
                                    staked[2] > 0 && `Horse #${staked[2]} has been returned to your wallet.`
                                }
                                {
                                    staked[3] > 0 && <br />
                                }
                                {
                                    staked[3] > 0 && `SkyBox #${staked[3]} has been returned to your wallet.`
                                }
                            </p>
                        </div> : ''
                    ))
                }

                <div className='viewBtnSection'>
                    {
                        modalType === 'unstake' ? (
                            <button className='viewBtn' onClick={unstakeNft}>STAKING HOME</button>
                        ) : (modalType === 'stake' ? (
                            <button className='viewBtn' onClick={onClickViewStakedTokens}>VIEW STAKED TOKENS</button>
                        ) : (modalType === 'harvest' ? (
                            <button className='viewBtn' onClick={harvestRewards}>VIEW STAKED TOKENS</button>
                        ) : ''))
                    }

                </div>
            </div>
        </div>
    )
}

export default Success