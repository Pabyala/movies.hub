import React from 'react'
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useGlobalContext } from '../Context/movieContext';

export default function SearchInput() {

    const navigate = useNavigate();

    const { fetchSearch, searchText, setSearchText } = useGlobalContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(searchText){
            window.scroll(0, 0);
            navigate('/search');
            await fetchSearch();
        } else {
            alert('Input should not be empty')
        }
    };

    return (
        <>
            <form 
                className="nav-search" 
                onSubmit={handleSubmit}
            >
                <input 
                    className='nav-input' 
                    type="text" 
                    placeholder='Search movie'
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <button className='nav-btn'>
                    <SearchIcon className='nav-searchIcon'/>
                </button>
            </form>
        </>
    )
}
