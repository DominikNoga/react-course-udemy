import React from 'react'

export default function TabButton({
    children,
    onClick,
    isSelected
}) {
    return (
        <li>
            <button onClick={onClick} className={isSelected ? 'active' : null}>
                {children}
            </button>
        </li>
    )
}
