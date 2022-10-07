import React from 'react';
import '../../App.css';

export default function Locations() {
    return (
        <div className="card locat-info">
            <div className="card-body">
                <div className="locatTitleBody">
                    <p className="locatTitle">12345 Stree Avenue</p>
                    <p className="locatTitle">Toon Town, CA, 92831</p>
                    <p className="locatSubtitle">United States</p>
                </div>
                <br />
                <div className="alerts">
                    <div className="alertBody">
                        <p className="alertDate">Updated as of mm/dd/yyyy hh:mm:ss</p>
                        <p className="alertText">This is an emergency alert message that you should read because it is very important.</p>
                    </div>
                    <div className="alertBody">
                        <p className="alertDate">Updated as of mm/dd/yyyy hh:mm:ss</p>
                        <p className="alertText">This is a weather alert message that you should read because it is very important.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}