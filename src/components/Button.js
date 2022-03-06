import React from 'react'

function Button({ className, onClick, title }) {
    return (
        <button className={className} onClick={onClick}>
            {title}
        </button>
    )
}

export default Button