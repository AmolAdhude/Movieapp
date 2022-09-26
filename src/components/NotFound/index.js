import {Link} from 'react-router-dom'

import './index.css'

function NotFound() {
  //   const notFindImageUrl =
  //     'https://res.cloudinary.com/dyx9u0bif/image/upload/v1657093957/snow-removal-machine-working-high-ski-slope-snowstorm_454047-2149_1_xgxo4o.png'
  return (
    <>
      <div className="not-found-container">
        <div className="not-found-videos-view">
          {/* <img
            className="not-found-videos-img"
            src={notFindImageUrl}
            alt="not found"
          /> */}
          <h1 className="not-found-videos-heading">Lost Your Way ?</h1>
          <p className="not-found-videos-note">
            we are sorry, the page you requested could not be found Please go
            back to the homepage.
          </p>
          <Link className="nav-link" to="/">
            <button className="not-found-comp-btn" type="button">
              Go to Home
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default NotFound
