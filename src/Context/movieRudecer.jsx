const GlobalReducer = (state, action) => {
    switch(action.type){
        //trending
        case "GET_TRENDING_MOVIES_TVSERIES": 
            return { ...state, trendingMovieTVSeries: action.payload, loading: false};
        case "SET_CURRENT_PAGE_TRENDING":
            return { ...state, currentPageTrending: action.payload };

        //movies
        case "GET_MOVIES": 
            return { ...state, movies: action.payload, loading: false}
        case "GET_TOTAL_PAGES_OF_MOVIES": 
            return { ...state, moviesTotalPages: action.payload}
        case "SET_CURRENT_PAGE_MOVIES":
            return { ...state, currentPageMovies: action.payload }; 
        case "SELECTED_GENRES_MOVIES": 
            return { ...state, selectedGenresMovies: action.payload}
        case "ALL_MOVIES_GENRES":   
            return { ...state, allGenresMovies: action.payload}

        //tv series
        case "GET_TVSERIES": 
            return { ...state, tvSeries: action.payload}
        case "GET_TOTAL_PAGES_OF_TVSERIES": 
            return { ...state, TvSeriesTotalPages: action.payload}
        case "SET_CURRENT_PAGE_TVSERIES": 
            return { ...state, currentPageTvSeries: action.payload}
        case "SELECTED_GENRES_TVSERIES": 
            return { ...state, selectedGenresTvSeries: action.payload}
        case "ALL_TVSERIES_GENRES":   
            return { ...state, allGenresTvSeries: action.payload}

        //search for movies
        case "GET_SEARCH_RESULT_MOVIE": 
            return { ...state, searchResultMovies: action.payload}
        case "GET_TOTAL_PAGES_OF_SEARCH_RESULT_MOVIES": 
            return { ...state, searchTotalPagesMovies: action.payload}
        case "SET_CURRENT_PAGE_SEARCH_RESULT_MOVIES":
            return { ...state, currentPageSearchMovies: action.payload};
            
        //search for tv series
        case "GET_SEARCH_RESULT_TVSERIES": 
            return { ...state, searchResultTvSeries: action.payload}
        case "GET_TOTAL_PAGES_OF_SEARCH_RESULT_TVSERIES": 
            return { ...state, searchTotalPagesTvSeries: action.payload} 
        case "SET_CURRENT_PAGE_SEARCH_RESULT_TVSERIES": 
            return { ...state, currentPageSearchTvSeries: action.payload}

        default:   
            return state; 
    }
}
export default GlobalReducer;   