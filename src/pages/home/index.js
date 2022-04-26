import React from 'react'
import Navbar from '../menu/navbar'

import './homepage.scss'

const Homepage = () => {
    return (
        <div className='home'>
            <div className='bodyHome'>
                <Navbar />
                <div className='title'>
                    STAKING BARN
                </div>
                <div className='nfts'>
                    <div className='items'>
                        <div className='item'>
                            <div className='scale'>2X</div>
                            <img src='/assets/image/home/Asset 10.png' alt='nft1' />
                            <div className='desc'>BARNCAT AMP</div>
                        </div>
                        <div className='item'>
                            <div className='scale'>3X</div>
                            <img src='/assets/image/home/Asset 9.png' alt='nft2' />
                            <div className='desc'>PONY AMP</div>
                        </div>
                    </div>

                    <div style={{ height: '10px', width: '250px' }}></div>

                    <div className='items'>
                        <div className='item'>
                            <div className='scale'>4X</div>
                            <img src='/assets/image/home/Asset 11.png' alt='nft3' />
                            <div className='desc'>HORSE AMP</div>
                        </div>
                        <div className='item'>
                            <div className='scale'>10X</div>
                            <img src='/assets/image/home/Asset 8.png' alt='nft4' />
                            <div className='desc'>SKYBOX AMP</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='greenBack'>
                <div className='backFence'>
                    <img src='/assets/image/home/BARN.svg' alt='barn' />
                </div>
            </div>
            <div className='hay'>
                <div className='hay-item'>
                    <img src='/assets/image/home/Left Hay.svg' alt='left hay' style={{ marginLeft: '-50px' }} />
                </div>
                <div className='hay-item'>
                    <img src='/assets/image/home/Center Hay.svg' alt='center hay' />
                </div>
                <div className='hay-item'>
                    <img src='/assets/image/home/Right Hay.svg' alt='right hay' style={{ marginRight: '-0px' }} />
                </div>
            </div>
            <div className='grassBack'>
                <div className='frontFence'>
                    <img src='/assets/image/home/Front Fence L.svg' alt='left fence' />
                    <img src='/assets/image/home/Front Fence R.svg' alt='right fence' />
                </div>
            </div>


        </div>
    )
}

export default Homepage