import AlertBody from "./alertbody";

export default function Locations ({ alertsData }) {
  return (
    <div className="col-sm-6">
      <div className="card locat-info">
          <div className="card-body">
            <div className="locatTitleBody">
                <p className="locatTitle">12345 Stree Avenue</p>
                <p className="locatTitle">Toon Town, CA, 92831</p>
                <p className="locatSubtitle">United States</p>
            </div>
            <br />
            <div className="alerts">
              {!alertsData && <p>There are no alerts at this time.</p>}
              {alertsData && alertsData.map(alert => (
                <AlertBody
                  key={alert.index}
                  alertDate={alert.effDate}
                  alertText={alert.text}
                />
              ))
              }
            </div>
          </div>
      </div>
    </div>
  )
}