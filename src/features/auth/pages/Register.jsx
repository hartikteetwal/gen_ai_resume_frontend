import React, { useState } from 'react'
import "../auth.form.scss"
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'



const Register = () => {

const [username,setUsername] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

    const { handleRegister,loading} = useAuth()
const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        handleRegister(email, password, username)
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
              <h1>Register</h1>
              <form onSubmit={handleSubmit}>
                  <div className="input-group">
                      <label htmlFor="username">Username</label>
                      <input type="username" id='username' name="username" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Enter username' />
                  </div>
                  <div className="input-group">
                      <label htmlFor="email">Email</label>
                      <input type="email" id='email' name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter email address' />
                  </div>
                  <div className="input-group">
                      <label htmlFor="password">Password</label>
                      <input type="password" id='password' name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter password' />
                  </div>
                  <button className='button primary-button' type='submit'>
                      Register
                  </button>
              </form>

              <p>Already have am account? <Link to={"/login"}>Login</Link></p>
          </div>
      </main>
  )
}

export default Register
