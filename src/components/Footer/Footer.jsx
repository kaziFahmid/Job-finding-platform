import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-dark text-white  py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h3>About Us</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac ex sit amet urna fringilla consequat.</p>
          </div>
          <div className="col-md-3">
            <h3>Quick Links</h3>
            <ul className="list-unstyled">
              <li><a href="/">Home</a></li>
              <li><a href="/findjobs">Find Jobs</a></li>
              <li><a href="/postjob">Post a Job</a></li>
       
            </ul>
          </div>
          <div className="col-md-3">
            <h3>Contact Us</h3>
            <ul className="list-unstyled">
              <li>Email: info@example.com</li>
              <li>Phone: 123-456-7890</li>
              <li>Address: 123 Street, City, Country</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center mt-3">
        <p>&copy; 2023 JobNexus. All rights reserved.</p>
      </div>
    </footer>
  );
}
