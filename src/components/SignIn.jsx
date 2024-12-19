import React from 'react';
import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { FaGoogle } from "react-icons/fa";

export const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (error) {
            setError(`Error: ${error.message}`);
        }
    };

    const handleSignInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/');
        } catch (error) {
            setError(`Error in signing with google: ${error.message}`)
        }
    };

    return (
        <div className="container">
            <h2 className="title">Login</h2>      
            <form onSubmit={handleSignIn}>  
                <input className="input" 
                    type="email" 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email/Username..." 
                    required
                />
                <input className="input" 
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password..." 
                    required
                />
                <div className="buttonGroup">
                    <button onClick={handleSignIn} className="button">Login</button>
                    <span className="orText">or</span>
                    <button onClick={handleSignInWithGoogle} className="googleButton">
                        <FaGoogle className="googleIcon" />
                    </button>
                </div>
            </form> 
 
            {error && <p className="error">{error}</p>}
            <p className="signUpText">
                Don't have an account? <Link to="/signup" className="link">Sign Up</Link>
            </p>
        </div>
    );
};