import SunIcon from '../assets/images/UVIsun.png';

export default function ActivitiesItem({ todoItem }) {
  return (
    <div className="card">
      {/* TODO: Dynamic images */}
      <img src={SunIcon} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{todoItem.name}</h5>
      </div>
    </div>
  )
}