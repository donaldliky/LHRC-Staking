import React from 'react';

import NftItem from '../NftItem';
import NftListItem from '../NftListItem';

import './NftSameModal.scss'

const NftSameModal = ({ closeModal, showList, onClickBack, onClickNftGroup, stake, barncatBalance, ponyBalance, horseBalance, skyboxBalance, nftBoostModal, tokens }) => {
    return (
        <div className='nftSameModal'>
            <div className='cross' onClick={closeModal}>&times;</div>
            {
                !showList ? <div className='title-bar' >
                    <div className='back' onClick={onClickBack}>BACK</div>
                    <div className='title'>
                        Add an NFT Booster
                    </div>
                    <div className='back' style={{ visibility: 'hidden' }} onClick={onClickBack}>BACK</div>
                </div> : <div className='title'>
                    Add an NFT Booster
                </div>
            }
            {
                showList ? <div className='div'>
                    <div>
                        <NftItem path='/assets/image/nft1.png' number={barncatBalance} name='Barncats' onClickNftGroup={() => nftBoostModal === 0 ? onClickNftGroup() : null} />
                        <NftItem path='/assets/image/nft2.png' number={ponyBalance} name='Ponies' onClickNftGroup={() => nftBoostModal === 1 ? onClickNftGroup() : null} />
                    </div>
                    <div>
                        <NftItem path='/assets/image/nft3.png' number={horseBalance} name='Horses' onClickNftGroup={() => nftBoostModal === 2 ? onClickNftGroup() : null} />
                        <NftItem path='/assets/image/nft4.png' number={skyboxBalance} name='Skybox' onClickNftGroup={() => nftBoostModal === 3 ? onClickNftGroup() : null} />
                    </div>
                </div> : <div className='nftList'>
                    {
                        nftBoostModal >= 0 ? tokens[nftBoostModal].map(token => <NftListItem nftBoostModal={nftBoostModal} path={token.image.replace('ipfs://', 'https://ipfs.io/ipfs/')} nftId={token.tokenId} stake={stake} key={token.tokenId} />) : ''
                    }
                </div>
            }
        </div>
    )
}

export default NftSameModal