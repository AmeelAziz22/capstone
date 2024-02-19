import React from 'react';
import '../assets/auth.css'


const LoginForm = () => {
  return (
    <div className="authbox">
        <div className="content">
            <header>
            <h1 className='authtitle'>Welcome back</h1>
            </header>
            <section>
                <form action="" className="login-form">
                    <div className="input-group">
                    <label for="username">Username</label>
                    <input type="text" placeholder="Enter username" id="username"/>
                    </div>
                    <div className="input-group">
                    <label for="password">Password</label>
                    <input type="password" placeholder="Enter password" id="password"/>
                    </div>
                    <div className="input-group"><button>Login</button></div>
                </form>
            </section>
            <footer>
            <span>Dont have an account yet? <a href="/register" title="Forgot Password">Create One.</a></span>
            </footer>
        </div>
    </div>
  );
}

export default LoginForm;