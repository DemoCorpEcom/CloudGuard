import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className='bg-gray-100 p-2 w-full h-max'>
            <NavLink to="/" className="bg-teal-400 p-2 m-2 rounded">Scan Status</NavLink>
            <NavLink to="/results" className="bg-teal-400 p-2 m-2 rounded">Results</NavLink>
        </div>
    )
}

export default Sidebar
