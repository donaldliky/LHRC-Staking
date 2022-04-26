import React from 'react';

const btnStyle = {
    borderRadius: '83.43px',
    backgroundColor: '#65361C',
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontSize: '32px',
    textAlign: 'center',
    padding: '24px',
    marginLeft: '10px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
}

const name = ['BARN CAT', 'PONY', 'HORSE', 'SKYBOX']

const NftListItem = ({ path, stake, nftId, nftBoostModal }) => {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '15px' }}>
                <img src={path} alt={path}
                    style={{ width: '120px', height: '120px' }}
                />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button
                        style={btnStyle}
                        onClick={() => stake(nftBoostModal, nftId)}
                    >STAKE {name[nftBoostModal]} #{nftId}</button>
                </div>
            </div>
        </div>
    )
}

export default NftListItem