import React from 'react';
import ReactLoading from 'react-loading';
import { getUvi, getMinutely } from '../utils/process';

export default function Details({ weatherData, aqiData }) {
  const uviInfo = getUvi(weatherData);
  const minutelyInfo = getMinutely(weatherData);

  return (
    <div className="col-sm-12">
      <div className="card w-100 text-center mt-4 cond-details">
        {!aqiData &&
          <ReactLoading type={'spinningBubbles'} color={'#56BFB5'} height={50} width={50} />
        }
        {aqiData &&
          <>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item navItemCustom" role="presentation">
                    <button className="nav-link active navLinkCustom" id="precip-tab" data-bs-toggle="tab" data-bs-target="#precip-tab-pane" type="button" role="tab" aria-controls="precip-tab-pane" aria-selected="true">Precipitation</button>
                </li>
                <li className="nav-item navItemCustom" role="presentation">
                    <button className="nav-link navLinkCustom" id="aqi-tab" data-bs-toggle="tab" data-bs-target="#aqi-tab-pane" type="button" role="tab" aria-controls="aqi-tab-pane" aria-selected="false">AQI</button>
                </li>
                <li className="nav-item navItemCustom" role="presentation">
                    <button className="nav-link navLinkCustom" id="uvi-tab" data-bs-toggle="tab" data-bs-target="#uvi-tab-pane" type="button" role="tab" aria-controls="uvi-tab-pane" aria-selected="false">UV Index</button>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="precip-tab-pane" role="tabpanel" aria-labelledby="precip-tab" tabindex="0">
                    <p>Current Precipiation</p>
                </div>
                <div className="tab-pane fade" id="aqi-tab-pane" role="tabpanel" aria-labelledby="aqi-tab" tabindex="0">
                    <p>Current Air Quality</p>
                    <p>General AQI: {Math.round(aqiData.overall)}</p>
                    <p>Ozone AQI: {Math.round(aqiData.ozone)}</p>
                    <p>Fine Matter AQI: {Math.round(aqiData.fine)}</p>
                    <p>Coarse Matter AQI: {Math.round(aqiData.coarse)}</p>
                </div>
                <div className="tab-pane fade" id="uvi-tab-pane" role="tabpanel" aria-labelledby="uvi-tab" tabindex="0">
                    <p>This Week's UV Outlook</p>
                </div>
            </div>
          </>
        }
      </div>
    </div>
  );
}