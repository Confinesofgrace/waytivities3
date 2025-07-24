import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import './LogIn.css';

function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/'); 
    } catch (err) {
      setError(err.message);
    }
  };

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const loginWithFacebook = async () => {
    try {
      await signInWithPopup(auth, new FacebookAuthProvider());
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div id="page-layout">
      <div id="login-modal">
        <div id="login-content">
          <div id="login-header">
            <h3>Waytivities</h3>
            <p>Log into your account</p>
            <hr />
          </div>

          <div id="login-options">
            <form id="login-email" onSubmit={handleLogin}>
              Log In with Email

              <input
                id="login-input"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                id="login-input"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button type="submit">Log In</button>

              <p style={{ fontSize: '10px' }}>Forgot password?</p>

              {error && <p style={{ fontSize: '12px', color: 'red' }}>{error}</p>}
            </form>

            <div id="or-divider">
              <p>or</p>
            </div>

            <div id="login-alternative">
              <div id="login-with" onClick={loginWithGoogle}>Log In with Google</div>
              <div id="login-with" onClick={loginWithFacebook}>Log In with Facebook</div>
            </div>
          </div>
        </div>

        <div id="new-user">
          <p>
            Don't have an account?{' '}
            <span>
              <Link
                to="/signup"
                style={{
                  fontWeight: '600',
                  color: 'purple',
                  cursor: 'pointer',
                }}
              >
                Sign Up
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
