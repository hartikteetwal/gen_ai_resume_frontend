import React, { useState } from 'react'
import "../auth.form.scss"
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Login = () => {

    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()
    
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    
    const handleSubmit = (e) => {
        e.preventDefault()
        handleLogin(email, password)
        navigate("/")
    }

    if (loading) {
        return (
            <main>
                <h1>Loading...</h1>
            </main>
        )
    }

  return (
      <main>
          <div className="form-container">
              <h1>Login</h1>
              <form onSubmit={handleSubmit}>
                  <div className="input-group">
                      <label htmlFor="email">Email</label>
                      <input type="email" id='email' name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter email address' />
                  </div>
                  <div className="input-group">
                      <label htmlFor="password">Password</label>
                      <input type="password" id='password' name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter password' />
                  </div>
                  <button className='button primary-button' type='submit'>
                      Login
                  </button>
              </form>
              <p>Don't have an account? <Link to={"/register"}>Sign up</Link></p>
          </div>
</main>
  )
}

export default Login
