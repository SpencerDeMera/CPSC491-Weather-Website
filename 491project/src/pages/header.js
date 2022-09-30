import React from 'react';
import ReactDOM from 'react-dom';
import '../App.css';

export default function Header() {
    return (
        <div className="head">
            <nav className="navbar fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">S N I P P E T</a>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </nav>
        </div>
    );
}