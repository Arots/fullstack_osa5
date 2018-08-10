import React from 'react'

const Notification = ({ message }) => {
    return (
        <div className="virheviesti">
            {message}
        </div>
    )
}

export default Notification