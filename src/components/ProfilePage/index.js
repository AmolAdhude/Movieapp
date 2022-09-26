import './index.css'
import {Link} from 'react-router-dom'

const ProfilePage = () => (
  <div className="profile-page-container">
    <Link to="/">
      <img
        src="https://res.cloudinary.com/dyx9u0bif/image/upload/v1657426908/lg-devices-logo_rpfa68.png"
        className="app-logo"
        alt="website logo"
      />
    </Link>
    <div className="select-profile-container">
      <h1 className="who">Who&apos;s watching?</h1>
      <ul className="profiles">
        <Link to="/" className="link">
          <li>
            <img
              src="https://res.cloudinary.com/dug30iszj/image/upload/v1664164170/MovieApp/eb648e0fd0b2676dbb7317310a48f9bdc2b0d282_xxswpy.png"
              alt="profile"
              className="profile-pic"
            />
            <h1 className="user">Amol</h1>
          </li>
        </Link>
        <Link to="/" className="link">
          <li>
            <img
              src="https://res.cloudinary.com/dug30iszj/image/upload/v1664164142/MovieApp/c1c1d3972f7a262e7429a7422498b6cbe18dd717_dmff8z.png"
              alt="profile"
              className="profile-pic"
            />
            <h1 className="user">Rahul</h1>
          </li>
        </Link>
        <Link to="/" className="link">
          <li>
            <img
              src="https://res.cloudinary.com/dug30iszj/image/upload/v1664164170/MovieApp/eb648e0fd0b2676dbb7317310a48f9bdc2b0d282_xxswpy.png"
              alt="profile"
              className="profile-pic"
            />
            <h1 className="user">Ram</h1>
          </li>
        </Link>
        <Link to="/" className="link">
          <li>
            <img
              src="https://res.cloudinary.com/dug30iszj/image/upload/v1664164228/MovieApp/a0b9ffd5b4892d2e41140d6a086f0983fd074e71_u7b9xe.png"
              alt="profile"
              className="profile-pic"
            />
            <h1 className="user">Kids</h1>
          </li>
        </Link>
      </ul>
    </div>
  </div>
)
export default ProfilePage
