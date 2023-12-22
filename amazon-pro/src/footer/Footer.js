import React from 'react'
import './Footer.css'
const Footer = () => {
  return (
    <div className="footer py-5 text-white-50 text-center text-md-start">
      <div className="container">
        <hr/>
        <div className="row">
          <div className="col-xs-12 col-md-6 col-lg-4 mt-4">
            <div className="info">
              <h5 className="text-white">Bondi</h5>
              <div className="copyright">
                Created By <span> Graphberry</span>
                <div>&copy; 2023 - <span>Bondi Inc</span></div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-md-6 col-lg-2 mt-4">
            <div className="links">
              <h5 className="text-light">Links</h5>
              <ul className="list-unstyled lh-lg">
                <li>Home</li>
                <li>Our Services</li>
                <li>Portfolio </li>
                <li>testimonials</li>
                <li>Support</li>
                <li>Terms and condition</li>
              </ul>
            </div>
          </div>
          <div className="col-xs-12 col-md-6 col-lg-2 mt-4">
            <div className="links">
              <h5 className="text-light">About Us</h5>
              <ul className="list-unstyled lh-lg">
                <li>sign In</li>
                <li>Register</li>
                <li>About Us </li>
                <li>Blog</li>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>
          <div className="col-xs-12 col-md-6 col-lg-4 mt-4">
            <div className="contact">
              <h5 className="text-light"> contact us</h5>
              <p className="lh-lg mt-3 mb-5">
                Get in touch with us via mail photo. We are wating for your call or message.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Footer