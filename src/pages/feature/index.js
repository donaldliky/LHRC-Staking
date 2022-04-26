import React from "react"

import FeatureItem from "../../components/FeatureItem/FeatureItem";
import './feature.scss'

const Feature = () => {
    return (
        <div className="featureBack">
            <div className="feature">
                <div className="title">
                    HEADING TEXT
                </div>
                <div className="desc">
                    BODY TEXT GOES HERE. INFORMATION ABOUT THIS SECTION.<br />
                    FOR MORE INFORMATION PLEASE USE TEXT HERE.
                </div>
                <div className="items">
                    <FeatureItem />
                    <FeatureItem />
                    <FeatureItem />  
                </div>
            </div>
        </div>
    )
}

export default Feature