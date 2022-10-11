import { format } from "date-fns";

const AlertBody = ({ alertDate, alertText }) => {
  return (
    <div className="alertBody">
        <p className="alertDate">Effective as of {format(new Date(alertDate), 'MM-dd-yyyy hh:mm')}</p>
        <p className="alertText">{alertText}</p>
    </div>
  )
}

export default AlertBody