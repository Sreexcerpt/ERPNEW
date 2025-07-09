// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const LoginForm = () => {
//     const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:8080/api/users/login', { email, password });
//       console.log('✅ Logged in user:', res.data.user);
//       alert('Login successful!');
//       const user = res.data.user;
//       // optional: save to localStorage
//       localStorage.setItem('user', JSON.stringify(user));
// console.log('User data saved to localStorage:', user);
//       // 👇 navigate to transaction selection
//       navigate('/loginscreen');
//  // Redirect to login screen with user data
//       // Save token/localStorage or redirect based on use case
//     } catch (err) {
//       alert('Login failed: ' + err.response?.data?.error || 'Unknown error');
//     }
//   };

//   return (
//     <form onSubmit={handleLogin} className="border p-4 rounded mb-4">
//       <h2 className="font-bold mb-2">Login</h2>
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//         className="border p-2 w-full mb-2"
//         required
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//         className="border p-2 w-full mb-2"
//         required
//       />
//       <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">
//         Login
//       </button>
//     </form>
//   );
// };

// export default LoginForm;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await axios.post('http://localhost:8080/api/users/login', { email, password });
      console.log('✅ Logged in user:', res.data.user);
      
      const user = res.data.user;
      // Store user data in memory instead of localStorage for Claude environment
      // localStorage.setItem('user', JSON.stringify(user));
      console.log('User data:', user);
      
      // Show success message
      alert('Login successful!');
      
      // Navigate to login screen
      navigate('/loginscreen');
      
    } catch (err) {
      alert('Login failed: ' + (err.response?.data?.error || 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow-lg border-0">
              <div className="card-body p-5">
                {/* Header */}  <h2 style={{textAlign:'center'}}>Jyothi ERP</h2>
                <div className="text-center mb-4">
                  <div className="mb-3">
                    <i className="fas fa-user-circle fa-3x text-primary"></i>
                  
                  </div>
                  <h2 className="card-title fw-bold text-dark mb-2">Welcome Back</h2>
                  <p className="text-muted">Sign in to your account</p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleLogin}>
                  {/* Email Field */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-semibold text-dark">
                      Email Address
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i className="fas fa-envelope text-muted"></i>
                      </span>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control border-start-0 ps-0"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label fw-semibold text-dark">
                      Password
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i className="fas fa-lock text-muted"></i>
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control border-start-0 border-end-0 ps-0"
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary border-start-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="rememberMe" />
                      <label className="form-check-label text-muted" htmlFor="rememberMe">
                        Remember me
                      </label>
                    </div>
                   
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-3 fw-semibold"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Signing In...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-sign-in-alt me-2"></i>
                        Sign In
                      </>
                    )}
                  </button>
                </form>

                {/* Divider */}
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;