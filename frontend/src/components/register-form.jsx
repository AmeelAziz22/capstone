import React from 'react';
import '../assets/auth.css'


const RegisterForm = () => {
  return (
    <div className="authbox">
        <div className="content">
            <header>
            <h1 className='authtitle'>Create Account</h1>
            </header>
            <section>
                <form action="" className="login-form">
                    <div className="input-group">
                    <label for="fname">First Name</label>
                    <input type="text" placeholder="Enter First Name" id="fname"/>
                    </div>
                    <div className="input-group">
                    <label for="lname">Last Name</label>
                    <input type="text" placeholder="Enter Last Name" id="lname"/>
                    </div>
                    <div className="input-group">
                    <label for="username">Username</label>
                    <input type="text" placeholder="Enter username" id="username"/>
                    </div>
                    <div className="input-group">
                    <label for="password">Password</label>
                    <input type="password" placeholder="Enter password" id="password"/>
                    </div>
                    <div className="input-group"><button>Register</button></div>
                </form>
            </section>
            <footer>
            <span>Already have an account? <a href="/login" title="Forgot Password">Login.</a></span>
            </footer>
        </div>
    </div>
  );
}

export default RegisterForm;