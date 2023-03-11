import React from 'react'
import { NavLink } from 'react-router-dom'
import Scan from '../../assets/icons/scan.svg'
import Result from '../../assets/icons/result.svg'


const Appbar = () => {
    return (
        <div className='p-2 flex flex-row items-center border-y-2 shadow-xl bg-white'>
            <div className="font-pacifico text-2xl text-blue-800">Admin Dashboard </div>
            <div className='ml-4 text-xl flex flex-row'>
                <NavLink to="/" className="flex flex-row items-center p-2 mx-2 rounded">
                    <img src={Scan} alt="scan" className="p-2" />
                    Scan Status
                </NavLink>
                <NavLink to="/results" className="flex flex-row p-2 mx-2 rounded items-center">
                    <img src={Result} alt="result" className="p-2" />
                    Results
                </NavLink>
            </div>
        </div >
    )
}

export default Appbar
