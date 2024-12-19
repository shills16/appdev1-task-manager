import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

export const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            navigate('/signin')
        } catch (error) {
            setError(`Error: ${error}`)
        }
    }

    return (
        <div className="container">
                <h2 className="title">Sign Up</h2>
                <form onSubmit={handleSignUp}>
                    <input className="input" 
                        type="email" 
                        placeholder='Email...' 
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                    />
                    <input className="input" 
                        type="password" 
                        placeholder='Password...' 
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                    />
                    <button className="signup" onClick={handleSignUp}>Sign Up</button>
                    {error && <p className="error">{error}</p>}
            </form>
            <p className="signUpText">Already have an account? <Link to='/signin' className="link">Login</Link></p>
        </div>
    )
}


