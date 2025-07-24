import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider
} from 'firebase/auth';

import './SignUp.css';

function SignUp() {
  const auth = getAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Account created!');
      navigate('/login'); // Redirect to login or another page
    } catch (err) {
      setError(err.message);
    }
  };

  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert('Signed up with Google!');
      navigate('/'); // or wherever you want to go after signup
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFacebookSignup = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
      alert('Signed up with Facebook!');
      navigate('/'); // or wherever you want to go after signup
    } catch (err) {
      setError(err.message);
    }
  };



  return (
    <div id='page-layout'>
      <div id='signup-modal'>
        <div id='signup-content'>
          <div id='signup-header'>
            <h3>Waytivities</h3>
            <p>Create your Waytivities account</p>
            <hr />
          </div>

          <div id='signup-options'>
            <form id='signup-email' onSubmit={handleSignup}>
              <div>Sign up with Email</div>
              <input
                id='signup-input'
                placeholder='Email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                id='signup-input'
                placeholder='Password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                id='signup-input'
                placeholder='Confirm Password'
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}

              <button type='submit' style={{ color: 'white' }}>
                Create account
              </button>
            </form>

            <div id='or-divider'><p>or</p></div>

            <div id='signup-alternative'>
              <div id='signup-with' onClick={handleGoogleSignup} >Sign up with Google</div>
              <div id='signup-with' onClick={handleFacebookSignup} >Sign up with Facebook</div>
            </div>
          </div>
        </div>

        <div id='have-account'>
          <p>
            Already have an account?{' '}
            <span>
              <Link to='/login' style={{ fontWeight: '600', color: 'purple', cursor: 'pointer' }}>
                Log In
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
