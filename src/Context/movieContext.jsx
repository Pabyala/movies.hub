import { useReducer, useContext, createContext, useState, useEffect } from "react";
import reducer from '../Context/movieRudecer'
import axios from "axios";
import useGenre from "../Hooks/useGenre";

const GlobalContext = createContext()

const apiKey = process.env.REACT_APP_API_KEY

export const GlobalContextProvider = ({ children }) => {

    const initialState = {
        trendingMovieTVSeries: [],
        movies: [],
        tvSeries: [],
        searchResultMovies: [],
        searchResultTvSeries: [],
        isSearch: false,

        //trending
        currentPageTrending: 1,
        trendingTotalPages: 10,

        //movies
        selectedGenresMovies: [],
        allGenresMovies: [],
        moviesTotalPages: [],
        currentPageMovies: 1, 

        //TV Series
        selectedGenresTvSeries: [], 
        currentPageTvSeries: 1,
        allGenresTvSeries: [],
        tvSeriesTotalPages: [],

        // search
        searchTotalPagesMovies: [],
        currentPageSearchMovies: 1,
        searchTotalPagesTvSeries: [],
        currentPageSearchTvSeries: 1,
        
    }

    const [state, dispatch] = useReducer(reducer, initialState)
    const [searchText, setSearchText] = useState('');
    const genreForUrl = useGenre(state.selectedGenresMovies);
    const genreForUrlTvSeries = useGenre(state.selectedGenresTvSeries);

    //fetching for trending
    const fetchTrending = async () => {
        try{
            const urlTrending = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=${apiKey}&page=${state.currentPageTrending}`;
            const response = await axios.get(urlTrending)
            dispatch({type: "GET_TRENDING_MOVIES_TVSERIES", payload: response.data.results})
        } catch (error) {
            console.error('Error fetching trending data:', error);
        }
    }

    //changing the pages
    const handlePageChange = (selectedPage, pageType) => {
        const newPage = selectedPage.selected + 1;
        if(pageType === 'trending'){
            dispatch({ type: "SET_CURRENT_PAGE_TRENDING", payload: newPage });
        } else if(pageType === 'movie'){
            dispatch({ type: "SET_CURRENT_PAGE_MOVIES", payload: newPage });
        } else if(pageType === 'tv'){
            dispatch({ type: "SET_CURRENT_PAGE_TVSERIES", payload: newPage });
        } else if (pageType === 'searchResultMovie'){
            dispatch({ type: "SET_CURRENT_PAGE_SEARCH_RESULT_MOVIES", payload: newPage });
        } else if (pageType === 'searchResultTvSeries') {
            dispatch({ type: "SET_CURRENT_PAGE_SEARCH_RESULT_TVSERIES", payload: newPage });
        }
        window.scroll(0, 0);
    };


    //fetching for trending
    const fetchMovie = async () => {
        try{
            const urlMovies = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${apiKey}&page=${state.currentPageMovies}&with_genres=${genreForUrl}`
            const response = await axios.get(urlMovies)
            dispatch({type: "GET_MOVIES", payload: response.data.results})
            dispatch({type: "GET_TOTAL_PAGES_OF_MOVIES", payload: response.data.total_pages})
        } catch (error) {
            console.error('Error fetching trending data:', error);
        }
    }

    //to add/select genre
    const handleAddGenre = (genre, type) => {
        if (type === 'movie') {
            dispatch({ type: "SELECTED_GENRES_MOVIES", payload: [...state.selectedGenresMovies, genre] });
            dispatch({ type: "ALL_MOVIES_GENRES", payload: state.allGenresMovies.filter(gen => gen.id !== genre.id) });
            dispatch({ type: "SET_CURRENT_PAGE_MOVIES", payload: 1 });
        } else if (type === 'tv') {
            dispatch({ type: "SELECTED_GENRES_TVSERIES", payload: [...state.selectedGenresTvSeries, genre] });
            dispatch({ type: "ALL_TVSERIES_GENRES", payload: state.allGenresTvSeries.filter(gen => gen.id !== genre.id) });
            dispatch({ type: "SET_CURRENT_PAGE_TVSERIES", payload: 1 });
        }
    }

    //to remove your added/selected genre
    const handleRemoveGenre = (genre, type) => {
        if (type === 'movie') {
            dispatch({ type: "SELECTED_GENRES_MOVIES", payload: state.selectedGenresMovies.filter(gen => gen.id !== genre.id) });
            dispatch({ type: "ALL_MOVIES_GENRES", payload: [...state.allGenresMovies, genre] });
            dispatch({ type: "SET_CURRENT_PAGE_MOVIES", payload: 1 });
        } else if (type === 'tv') {
            dispatch({ type: "SELECTED_GENRES_TVSERIES", payload: state.selectedGenresTvSeries.filter(gen => gen.id !== genre.id) });
            dispatch({ type: "ALL_TVSERIES_GENRES", payload: [...state.allGenresTvSeries, genre] });
            dispatch({ type: "SET_CURRENT_PAGE_TVSERIES", payload: 1 });
        }
    }

    //fetching genre base on the genreType
    const fetchGenre = async (genreType) => {
        try{
            const urlGenre = `https://api.themoviedb.org/3/genre/${genreType}/list?language=en&api_key=${apiKey}`
            const response = await axios.get(urlGenre)

            //filter method to create new aray by iterating/repeat each element (genre)
            //return true if the selectedGenre.id === genre.id is the same
            const filteredAllGenres = response.data.genres.filter(genre =>
                !state.selectedGenresMovies.some(selectedGenre => selectedGenre.id === genre.id)
            );

            const filterAllGenreTvSeries = response.data.genres.filter(genre =>
                !state.selectedGenresTvSeries.some(selectedGenre => selectedGenre.id === genre.id)
            );

            if (genreType === 'movie') {
              dispatch({type: "ALL_MOVIES_GENRES", payload: filteredAllGenres})
            } else if (genreType === 'tv') {
              dispatch({ type: 'ALL_TVSERIES_GENRES', payload: filterAllGenreTvSeries });
            }
        } catch (error) {
            console.error('Error fetching trending data:', error);
        }
    }

    //fetching TvSeries
    const fetchTVSeries = async () => { 
        try{ 
            const urlTVSeries = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${apiKey}&page=${state.currentPageTvSeries}&with_genres=${genreForUrlTvSeries}`
            const response = await axios.get(urlTVSeries)
            dispatch({type: "GET_TVSERIES", payload: response.data.results})
            dispatch({type: "GET_TOTAL_PAGES_OF_TVSERIES", payload: response.data.total_pages})
        } catch (error) {
            console.error('Error fetching trending data:', error);
        }
    }

    //fetching search
    const fetchSearch = async () => {
            try {
                const urlSearchMovie = `https://api.themoviedb.org/3/search/movie?query=${searchText}&include_adult=false&language=en-US&page=${state.currentPageSearchMovies}&api_key=${apiKey}`
                const responseMovie = await axios.get(urlSearchMovie) 
                dispatch({type: "GET_SEARCH_RESULT_MOVIE", payload: responseMovie.data.results})
                dispatch({type: "GET_TOTAL_PAGES_OF_SEARCH_RESULT_MOVIES", payload: responseMovie.data.total_pages})

                const urlSearchTvSeries = `https://api.themoviedb.org/3/search/tv?query=${searchText}&include_adult=false&language=en-US&page=${state.currentPageSearchMovies}&api_key=${apiKey}`
                const responseTvSeries = await axios.get(urlSearchTvSeries) 
                dispatch({type: "GET_SEARCH_RESULT_TVSERIES", payload: responseTvSeries.data.results})
                dispatch({type: "GET_TOTAL_PAGES_OF_SEARCH_RESULT_TVSERIES", payload: responseTvSeries.data.total_pages})
            } catch (error) {
                console.error(error);
            }
    }


    useEffect( () => {
        fetchTrending();
        fetchMovie()
        fetchTVSeries()

        fetchGenre('movie')
        fetchGenre('tv')
        fetchSearch()
        // eslint-disable-next-line
    }, [state.currentPageTrending, state.currentPageTvSeries, state.currentPageMovies, genreForUrl, 
        genreForUrlTvSeries, state.currentPageSearchMovies, state.currentPageSearchTvSeries, searchText
    ])


    return (
        <GlobalContext.Provider
            value={{
                ...state, 
                handlePageChange,
                handleAddGenre,
                handleRemoveGenre,
                fetchGenre,
                fetchSearch,
                searchText,
                setSearchText
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}
