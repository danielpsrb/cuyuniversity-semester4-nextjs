import React from 'react'
import {FaHome} from 'react-icons/fa'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const Homepage = () => {
    return (
        <div className='flex md:items-center items-center'>
            <Link href="#">
                <span><FontAwesomeIcon icon={faHome} /></span>
            </Link>
        </div>
    )
}

export default Homepage