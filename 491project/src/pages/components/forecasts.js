import React from 'react';
import ReactLoading from 'react-loading';
import '../../App.css';
import { getHourly, getDaily } from '../utils/process';

export default function Forecasts() {
    let hourlyInfo = getHourly();
    let dailyInfo = getDaily();

    if (hourlyInfo && dailyInfo) {
        return (
            <div className="card w-100 text-center mt-4 forecasting">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item navItemCustom" role="presentation">
                        <button className="nav-link active navLinkCustom" id="horuly-tab" data-bs-toggle="tab" data-bs-target="#horuly-tab-pane" type="button" role="tab" aria-controls="horuly-tab-pane" aria-selected="true">24-Hour</button>
                    </li>
                    <li className="nav-item navItemCustom" role="presentation">
                        <button className="nav-link navLinkCustom" id="daily-tab" data-bs-toggle="tab" data-bs-target="#daily-tab-pane" type="button" role="tab" aria-controls="daily-tab-pane" aria-selected="false">7-Day</button>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="horuly-tab-pane" role="tabpanel" aria-labelledby="horuly-tab" tabindex="0">
                        <p>24 Hour Forecast</p>
                    </div>
                    <div className="tab-pane fade" id="daily-tab-pane" role="tabpanel" aria-labelledby="daily-tab" tabindex="0">
                        <p>7 Day Forcast</p>
                    </div>
                </div>
            </div>
        );
    } else {
        <div className="card w-100 text-center mt-4 cond-details">
            <ReactLoading type={'spinningBubbles'} color={'#56BFB5'} height={50} width={50} />
        </div>
    }
}