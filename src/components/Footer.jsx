function Footer() {
  return (
    <footer className="footer mt-auto py-3 bg-dark text-white">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Company</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Resources</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#">FAQs</a>
              </li>
              <li>
                <a href="#">Documentation</a>
              </li>
              <li>
                <a href="#">Support</a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#">Facebook</a>
              </li>
              <li>
                <a href="#">Twitter</a>
              </li>
              <li>
                <a href="#">Instagram</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
