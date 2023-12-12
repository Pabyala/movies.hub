import React from 'react'
import { Container } from 'react-bootstrap'
import './NavbarStyle.css'
import LinkNavigation from './LinkNavigation';
import SearchInput from './SearchInput';

export default function Navbar() {

    return (
        <>
        <div className='navbars'>
            <Container> 
                <div className='nav-wrap'>
                    <div className="nav-title-search">
                        <div className="nav-title">
                            <h4 className='title'>Movies.Hub</h4>
                        </div>
                        <SearchInput/>
                    </div>
                    <LinkNavigation/>
                </div>
            </Container>
        </div>
        </>
    )
}