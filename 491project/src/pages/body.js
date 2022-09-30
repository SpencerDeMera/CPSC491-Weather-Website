import React from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import Conditions from './components/conditions';
import Locations from './components/locations';
import Activities from './components/activities';
import Details from './components/details';
import Forecasts from './components/forecasts';

export default function Body({coords}) {
    const {lat, lon} = coords;

    return (
        <div className="showcase">
            <div className="content">
                <div className="main-body">
                    <div className="container-fluid mt-4">
                        <div className="row d-flex">
                            <div className="col-sm-6 mainBox">
                                <Conditions />
                            </div>
                            <div className="col-sm-6">
                                <Locations />
                            </div>
                            <div className="col-sm-12">
                                <Activities />
                            </div>
                            <div className="col-sm-12">
                                <Details />
                            </div>
                            <div className="col-sm-12">
                                <Forecasts />
                            </div>
                            <h3>**TESTING** Lat: {lat} | Lon: {lon}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}