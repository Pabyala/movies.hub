const useGenre = (selectedGenres) => {
    if(selectedGenres.length < 1){
        return;
    }
    const genreId = selectedGenres.map((genre) => genre.id);
    return genreId.join(',')
}

export default useGenre;


