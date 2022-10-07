import React, { useState } from 'react';
import '../App.css';

export default function Header() {
    return (
        <div className="head">
            <nav className="navbar fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">S N I P P E T</a>

                    {/* <button className="current-location-button">
                        <p>{currLocation.name}, {currLocation.country}</p>
                    </button> */}
                </div>
            </nav>
        </div>
    );
}