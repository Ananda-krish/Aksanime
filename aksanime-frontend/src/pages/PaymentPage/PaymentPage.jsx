import React from "react";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";
import "./PaymentPage.css";

function PaymentPage() {
  return (
    <DefaultLayout>
      <div className="payment-container">
        <h2><a href="">LOGIN</a> / <a href="">SIGN UP</a></h2>
        <p className="or-text">OR</p>
        <h3>CONTINUE AS GUEST</h3>
        <form className="payment-form">
          <div className="form-row">
            <input type="text" placeholder="First Name*" required />
            <input type="text" placeholder="Last Name*" required />
            <input type="text" placeholder="Company" />
          </div>
          <div className="form-row">
            <input type="text" placeholder="Flat Number*" required />
            <input type="email" placeholder="Email Id*" required />
            <input type="text" placeholder="Mobile Number*" required />
          </div>
          <div className="form-row">
            <input type="text" placeholder="Apartment Address*" required />
            <input type="text" placeholder="Pincode*" required />
            <button type="button" className="get-details-btn">GET DETAILS</button>
          </div>
          <div className="form-row">
            <input type="text" placeholder="City" disabled />
            <input type="text" placeholder="State" disabled />
            <input type="text" placeholder="Country" disabled />
          </div>
          <div className="whatsapp-updates">
            <input type="checkbox" id="updates" />
            <label htmlFor="updates">Get important updates on WhatsApp. <span>T&C</span></label>
          </div>
          <div className="form-actions">
            <button className="cancel-btn">CANCEL</button>
            <button className="save-btn">SAVE AND USE THIS ADDRESS</button>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
}

export default PaymentPage;
