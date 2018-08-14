import React from 'react'

const Notification = ({ message }) => {
    return (
        <div className={"" + (message === '' ? "virheViesti" : "lisaysViesti")}>
            {message}
        </div>
    )
}

export default Notification