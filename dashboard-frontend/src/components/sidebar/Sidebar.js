import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className='w-[100px] bg-gray-100 h-full flex flex-col p-2'>
            <NavLink to="/">Scan Status</NavLink>
            <NavLink to="/results">Results</NavLink>
        </div>
    )
}

export default Sidebar
