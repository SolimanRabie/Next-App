import React from "react";

const ContactUsComponent = () => {
  return (
    <div className="py-5 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="text-center mb-5">
              <h1 className="display-4 fw-bold text-primary mb-3">
                📞 Contact Us
              </h1>
              <p className="lead text-muted">
                We'd love to hear from you! Get in touch with our team.
              </p>
            </div>
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-5">
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="d-flex align-items-center mb-3">
                      <div
                        className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{ width: "50px", height: "50px" }}
                      >
                        <span>📧</span>
                      </div>
                      <div>
                        <h5 className="mb-1">Email</h5>
                        <p className="text-muted mb-0">info@mystore.com</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-center mb-3">
                      <div
                        className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{ width: "50px", height: "50px" }}
                      >
                        <span>📱</span>
                      </div>
                      <div>
                        <h5 className="mb-1">Phone</h5>
                        <p className="text-muted mb-0">+123 456 789</p>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <button className="btn btn-primary btn-lg w-100 rounded-pill fw-bold">
                  ✉️ Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsComponent;
