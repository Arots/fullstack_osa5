import React from 'react'
import Notification from './Notification'

const LoginForm = ({ username, passwordHash, handleSubmit, handleChange, message }) => {
    return (
        <div>
            <h2>Log in to application </h2>
            {message === '' ? <div />  : <Notification className="virheteksti" message={message}/> }
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