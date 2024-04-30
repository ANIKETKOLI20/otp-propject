import React, { useState } from 'react';
import firebase from '../../../firebase'; 
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import './index.css'

function Otp() {
  const auth = getAuth();
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'mobile') {
      // Ensure only numbers are entered for the mobile number
      const onlyNums = value.replace(/[^0-9]/g, '');
      setMobile(onlyNums); // Update mobile state
    } else if (name === 'otp') {
      // For OTP field, no transformation needed
      setOtp(value);
    }
  };

  const configureCaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        onSignInSubmit();
        console.log("Recaptcha Verified");
      }
    });
  };

  const onSubmitOtp = (e) =>{
    e.preventDefault();
    const code = otp
    window.confirmationResult.confirm(code).then((result) => {
    // User signed in successfully.
    const user = result.user;
    alert("User is Verified")
    // ...
  }).catch((error) => {
    // User couldn't sign in (bad verification code?)
    // ...
  });
  }

  const onSignInSubmit = (e) => {
    e.preventDefault();
    configureCaptcha();
    const phoneNumber = "+91" + mobile; // Prefix "+91" to mobile number
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log("OTP has been sent");
        // ...
      }).catch((error) => {
        console.log("SMS Not Sent");
        // ...
      });
  };

  return (
    <div className='otp-container'>
      <form onSubmit={onSignInSubmit}>
        <h1>Login</h1>
        <div id='sign-in-button'></div>
        <input type='tel' name='mobile' value={mobile} required onChange={handleChange} />
        <button type='submit'>Submit</button>
      </form>
      <form onSubmit={onSubmitOtp}>
        <h1>OTP</h1>
        <input type='number' name='otp' value={otp} required onChange={handleChange} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default Otp;
