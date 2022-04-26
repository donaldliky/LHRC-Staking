import React from 'react';
// import styledComponents from 'styled-components';

// import itemImg from '../../assets/image/1x/Asset 5.png'
import './featureItem.scss'

// const StyledBody = styledComponents.section`
//     border-radius: 40px;
//     padding: 20px;
//     display: flex;
//     flex-direction: column;
//     background-color: #65361c;
//     border: 3px solid rgb(153, 112, 93);
// `

// const StyledItemTitle = styledComponents.text`
//     color: white;
//     text-shadow: -1px 0 #65361c, 0 1px #65361c, 1px 0 #65361c, 0 -1px #65361c;
//     font-size: 40px;
//     margin-top: 20px;
// `

// const StyledItemDesc = styledComponents.text`
//     color: rgb(153, 112, 93);
//     font-size: 20px;
// `

const FeatureItem = (props) => {
    return (
        <div>
            <div className='featureItem'>
                {/* <img src={itemImg} alt='item-img' style={{ width: '140px', height: '90px' }} /> */}
                <div className='itemTitle'>FEATURE<br />ITEM #1</div>
                <div className='itemDesc'>Text info goes here.</div>
            </div>
        </div>
    )
}

export default FeatureItem