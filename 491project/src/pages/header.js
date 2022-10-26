export default function Header({unitsSystem, setUnitsSystem}) {
    return (
        <div className="head">
            <nav className="navbar fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">S N I P P E T</a>

                    <div className="currUnitBtn">
                        <p className="currUnitBtn-text" onClick={() => {
                            setUnitsSystem('imperial'); // invert unitsSystem flag
                        }}>F</p>
                        <p className="currUnitBtn-text" onClick={() => {
                            setUnitsSystem('metric'); // invert unitsSystem flag
                        }}>C</p>
                    </div>
                </div>
            </nav>
        </div>
    );
}