import './index.css'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

const Footer = () => (
  <div className="footer-container">
    <div>
      <ul className="social-list">
        <li>
          <FaGoogle className="social-icon" />
        </li>
        <li>
          <FaTwitter className="social-icon" />
        </li>
        <li>
          <FaInstagram className="social-icon" />
        </li>
        <li>
          <FaYoutube className="social-icon" />
        </li>
      </ul>
    </div>
    <div>
      <p className="footer-head">Contact us</p>
    </div>
  </div>
)
export default Footer
