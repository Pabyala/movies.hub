import { Chip } from '@mui/material';
import React from 'react'
import './GenreStyle.css'
import { useGlobalContext } from '../Context/movieContext';

export default function Genres({ type, selectedGenres, allGenres, }) {

    const { handleAddGenre, handleRemoveGenre } = useGlobalContext();

    return (
        <div className='genre'>
            {selectedGenres && selectedGenres.map((genre) => 
                <Chip
                    className='genre-chip'
                    key={genre.id}
                    label={genre.name}
                    clickable
                    size='small'
                    color='primary'
                    onDelete={() => handleRemoveGenre(genre, type)}
                />
            )}
            {allGenres && allGenres.map((genre) => 
                <Chip
                    className='genre-chip'
                    key={genre.id}
                    label={genre.name}
                    clickable
                    size='small'
                    onClick={() => handleAddGenre(genre, type)}
                />
            )}
        </div>
    )
}









    // const handleAddGenre = (genre) => {
    //     setSelectedGenres([...selectedGenres, genre])
    //     setAllGenres(allGenres.filter(gen => gen.id !== genre.id))
    //     setCurrentPage(1)
    // }

    // const handleRemoveGenre = (genre) => {
    //     setSelectedGenres(selectedGenres.filter(gen => gen.id !== genre.id))
    //     setAllGenres([...allGenres, genre])
    //     setCurrentPage(1)
    // }

    // const fetchGenre = async () => {
    //     try{
    //         const apiKey = "d1ebb2cc85767e03917f2d8d07a917ad";
    //         const urlGenre = `https://api.themoviedb.org/3/genre/${type}/list?language=en&api_key=${apiKey}`
    //         const response = await axios.get(urlGenre)
    //         console.log("Genres", response.data.genres);
    //         setAllGenres(response.data.genres)
    //         // setTotalPages(response.data.total_pages)
    //     } catch (error) {
    //         console.error('Error fetching trending data:', error);
    //     }
    // }

    // useEffect(() => {
    //     fetchGenre()

    //     return () => {
    //         setAllGenres([])
    //     }
    //     // eslint-disable-next-line
    // }, [])
