import React from 'react';
// import styledComponents from 'styled-components';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
// import MenuItem from '@mui/material/MenuItem';
// import FormHelperText from '@mui/material/FormHelperText';
// import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';

import './chart.scss'

// import { Doughnut } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
// import Chart from 'chart.js/auto';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'

// const ChartbodySection = styledComponents.section`
//     padding: 30px 20px 20px;
//     display: flex;
//     justify-content: space-between;

// `

// const ChartInfoSection = styledComponents.section`
//     padding: 20px;
//     width: 70%;
//     background-color: #65361c;
//     height: 100px;
//     border-radius: 30px;

// `

// const SwapSection = styledComponents.section`
//     padding: 20px;
//     background-color: #65361c;
//     border-radius: 30px;


// `
// const StyledBtn = styledComponents.button`
//     border-radius: 20px;
//     background-color: greenyellow;
// `

// const StyledSwapItem = styledComponents.section`
//     display: flex;
//     flex-direction: row;
// `
// const StyledSwapItemTop = styledComponents.section`
//     color: yellow;
// `
// const StyledSwapInput = styledComponents.input`
//     color: white;
//     border-radius: 20px;
//     background-color: rgb(153, 112, 93);
//     text-align: right;
// `

const chartdata = {
    labels: ['6:00PM', '9:00PM', '10:00PM', '11:00PM', '12:00PM', '1:00PM', '2:00PM'],
    datasets: [
        {
            // label: 'MEISHU',
            fill: true,
            backgroundColor: 'yellowgreen',
            borderColor: 'white',
            borderWidth: 2,
            data: [0.8, 0.7, 0.7, 0.6, 0.65, 0.4, 0.3],
            width: '100%',
            // borderDashOffset: '5',
            // borderDash: [5, 5],
        }
    ]
}

const ChartBody = () => {
    // const [age, setAge] = useState('');

    // const handleChange = (event) => {
    //   setAge(event.target.value);
    // };

    return (
        <div className='chartBack'>
            <div className='chartbodySection'>
                <div className='chartInfoSection'>
                    <div className='firstSection'>
                        <div className='left'>
                            <CircleOutlinedIcon sx={{ color: 'white', fontSize: '50px' }} />
                            <CircleOutlinedIcon sx={{ color: 'white', fontSize: '50px' }} />
                            <div style={{ marginLeft: '10px', fontSize: '33px', color: '#C7FF54' }}>xyz/abc</div>
                            <SwapHorizIcon sx={{ color: 'color: #C7FF54;', marginLeft: '10px', fontSize: '80px' }} />
                            <div style={{ color: '#12b8ce', marginLeft: '10px', fontSize: '26px' }}>xyz/abc</div>
                        </div>
                        <div className='right'>
                            1W 1M 1Y
                        </div>
                    </div>
                    <div className='secondSection'>
                        <font style={{ color: '#C7FF54', fontSize: '60px', fontWeight: 'bold' }}>24.85&nbsp;</font>
                        <font style={{ color: '#C7FF54', fontSize: '33px' }}>xyz/abc&nbsp;</font>
                        <font style={{ color: '#12b8ce', fontSize: '26px' }}>-1.811(-3.02%)</font>
                    </div>
                    <div className='thirdSection'>
                        <font style={{ color: '#12b8ce', fontSize: '26px' }}>March 22, 2022 - 1:30PM</font>
                    </div>
                    <div className='chart'>
                        <Line
                            data={chartdata}
                            options={{
                                // title: {
                                //     display: true,
                                //     text: 'Price List',
                                //     fontSize: 20,
                                //     color: 'white'
                                // },
                                plugins: {
                                    legend: {
                                        display: false
                                    }
                                },
                                responsive: true,
                                scales: {
                                    y: {
                                        grid: {
                                            drawBorder: true,
                                            color: function (context) {
                                                if (context.tick.value > 0) {
                                                    return 'rgba(0,0,0,0)';
                                                } else if (context.tick.value < 0) {
                                                    return 'white';
                                                }

                                                return 'rgba(0,0,0,0)';
                                            },
                                        },
                                        min: 0,
                                        max: 1,
                                        ticks: {
                                            // forces step size to be 50 units
                                            stepSize: 0.1,
                                        }
                                    },
                                    x: {
                                        grid: {
                                            drawBorder: true,
                                            color: function (context) {
                                                if (context.tick.value > 0) {
                                                    return 'rgba(0,0,0,0)';
                                                } else if (context.tick.value < 0) {
                                                    return 'white';
                                                }
                                                return 'rgba(0,0,0,0)';
                                            },
                                        },
                                        ticks: {
                                            // forces step size to be 50 units
                                            color: '#12b8ce',
                                            font: {
                                                size: 26
                                            }
                                        }
                                    }
                                }
                            }}
                            height="0px"
                            style={{ width: '100%', height: '100%' }}
                        />
                    </div>
                </div>
                <div className='swapSection'>
                    <div style={{ display: 'flex', flexDirection: 'column', }}>

                        <div className="top">
                            <div className='swap_left'>
                                <CircleOutlinedIcon sx={{ color: 'white', fontSize: '50px' }} />
                                <div className='swap_title'>
                                    <div style={{ fontSize: '40px' }}>SWAP</div>
                                    <div style={{ fontSize: '20px' }}>Trade tokens in an instant</div>
                                </div>
                            </div>
                            <div className='swap_right'>
                                <CircleOutlinedIcon sx={{ color: 'white', fontSize: '45px' }} />
                                <CircleOutlinedIcon sx={{ color: 'white', fontSize: '45px' }} />
                            </div>
                        </div>
                        <div className='swap_item' style={{ marginTop: '72px' }}>
                            <div className='swap_item_desc'>
                                <CircleIcon sx={{ color: 'white', fontSize: '50px' }} />
                                <div style={{ color: 'yellow', fontSize: '33px' }}>abc</div>
                                <ArrowDropDownIcon sx={{ fontSize: '50px', color: 'yellow' }} />
                            </div>
                            <input value={'0.0'} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '47px' }}>
                            <ArrowDropDownIcon sx={{ fontSize: '100px', color: 'yellow' }} />
                        </div>

                        <div className='swap_item' >
                            <div className='swap_item_desc'>
                                <CircleIcon sx={{ color: 'white', fontSize: '50px' }} />
                                <div style={{ color: 'yellow', fontSize: '33px' }}>xyz</div>
                                <ArrowDropDownIcon sx={{ fontSize: '50px', color: 'yellow' }} />
                            </div>
                            <input value={'0.0'} />
                        </div>
                        <p style={{ fontSize: '20px', color: '#75E0EC', textAlign: 'center' }}>SLIPPAGE TOLERANCE - 0.5%</p>
                    </div>
                    {/* <StyledBtn>CONNECT WALLET</StyledBtn> */}
                    <button className='wallet'>CONNECT WALLET</button>
                </div>
            </div>
        </div>
    )
}

export default ChartBody