import React from 'react'

const LoginForm = ({ username, passwordHash, handleSubmit, handleChange }) => {
    return (
        <div>
            <h2>Log in to application </h2>
            <form onSubmit={handleSubmit} >
                username: <input className="input" name="username"
                type="text" value={username} onChange={handleChange} />
                <br/>
                password: <input className="input" name="passwordHash" 
                type="password" value={passwordHash} onChange={handleChange} />
                <br/>
                <button type='submit' className="button">Login </button>
            </form>
        </div>
    )
}

export default LoginForm