import React from 'react';

const styleText = {
    color: '#3F2827',
    fontFamily: 'Montserrat',
    fontSize: '24px',
    letterSpacing: '1.76px',
    textAlign: 'center',
    fontWeight: 'bold'
}

const NftItem = (props) => {
    return (
        <div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <img
                    src={props.path} alt={props.path}
                    style={{
                        width: '100%', height: '100%', border: '5px solid #65361c',
                        borderRadius: '50%', cursor: 'pointer'
                    }}
                    onClick={props.onClickNftGroup}
                />
                <div style={styleText}>{props.number}&nbsp;{props.name}<br />in wallet </div>
            </div>
        </div>

    )
}

export default NftItem