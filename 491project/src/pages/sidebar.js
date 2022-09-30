import React from 'react';
import ReactDOM from 'react-dom';
import '../App.css';

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="search-area">
                <div className="input-group mb-3">
                    <input type="text" className="form-control form-control-sm" placeholder="Search" aria-label="Location Search" aria-describedby="button-addon2" />
                    <button className="btn btn-outline-light" type="button" id="button-addon2">
                        <span className="fas fa-magnifying-glass"></span>
                    </button>
                </div>
            </div>

            <div className="sidebar-divider"></div>

            <div className="saved-area">
                <div className="saved-title">
                    <p>Saved Locations</p>
                </div>
                <div className="saved-locs">
                    <a>Pomona, Ca</a>
                    <a>Fullerton, Ca</a>
                    <a>Long Beach, Ca</a>
                </div>
            </div>
        </div>
    );
}