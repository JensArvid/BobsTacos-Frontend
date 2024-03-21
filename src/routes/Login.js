import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Logout from "./Logout";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Clear sessionStorage
    sessionStorage.clear();
  }, []);

  const proceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      fetch("https://localhost:7027/api/users/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((resp) => {
        if (resp.token) {
          toast.success('Success');
          sessionStorage.setItem('token', resp.token);
          sessionStorage.setItem('email', resp.email);
          sessionStorage.setItem('firstName', resp.firstName);
          sessionStorage.setItem('lastName', resp.lastName);
          sessionStorage.setItem('userId', resp.id); // Store the user ID
          navigate('/account');
          window.location.reload();
        }
         
        else {
          toast.error('Please enter valid credentials');
        }
      })
      .catch((err) => {
        toast.error('Login failed due to: ' + err.message);
      });
    }
  };

  const validate = () => {
    let result = true;
    if (!email) {
      result = false;
      toast.warning('Please enter an email');
    }
    if (!password) {
      result = false;
      toast.warning('Please enter a password');
    }
    return result;
  };

  return (
    <div className="row">
      <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
        <form onSubmit={proceedLogin} className="container">
          <div className="card">
            <div className="card-header">
              <h2>User Login</h2>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>Email <span className="errmsg">*</span></label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Password <span className="errmsg">*</span></label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn-primary">Login</button>
              <Link className="btn-success" to={'/register'}>New User</Link>
              {sessionStorage.getItem('token') ? (
                <>
                  <span>Welcome, {sessionStorage.getItem('firstName')} {sessionStorage.getItem('lastName')}</span>
                  <Logout /> {/* Render the Logout button when logged in */}
                </>
              ) : null}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;