import React from 'react';
import StatisticsItem from '../../components/statistics/StatisticsItem'
import SwapVertIcon from '@mui/icons-material/SwapVert';
import './Statistics.scss'

const Statistics = () => {
    return (
        <div>
            <div className="featureBack">
                <div className="feature">
                    <div className="title">
                        HEADING TEXT
                    </div>
                    <div className="desc">
                        BODY TEXT GOES HERE. INFORMATION ABOUT THIS SECTION.<br />
                        FOR MORE INFORMATION PLEASE USE TEXT HERE.
                    </div>
                    <div style={{ color: '#65361C', fontSize: '50px', display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
                        TOP INFO POOLS <SwapVertIcon />
                    </div>
                    <div className="statisticsItems">
                        <StatisticsItem />
                        <StatisticsItem />
                        <StatisticsItem />
                        <StatisticsItem />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Statistics