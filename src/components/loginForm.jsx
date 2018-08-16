import React from 'react'
import Notification from './Notification'
import PropTypes from 'prop-types'

const LoginForm = ({ username, passwordHash, handleSubmit, handleChange, message }) => {
    return (
        <div>
            <h2>Log in to application </h2>
            {message === '' ? <div />  : <Notification className="virheViesti" message={message}/> }
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

LoginForm.propTypes = {
    username: PropTypes.string.isRequired,
    passwordHash: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired
}

export default LoginForm