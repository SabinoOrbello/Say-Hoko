import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <footer className="footer mt-auto py-5  text-white w-100">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5 className="footer-heading">Company</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="footer-link">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5 className="footer-heading">Resources</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="footer-link">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Support
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5 className="footer-heading">Follow Us</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="footer-link">
                  <FontAwesomeIcon icon={faFacebook} className="me-2" />
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  <FontAwesomeIcon icon={faTwitter} className="me-2" />
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  <FontAwesomeIcon icon={faInstagram} className="me-2" />
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
