import React  from 'react'
import { Col, Row } from 'react-bootstrap'
import SingleContent from '../Components/SingleContent';
import CustomPagination from '../Components/CustomPagination';
import Genres from '../Components/Genres';
import Loading from '../Components/Loading';
import './PagesStyle.css'
import { useGlobalContext } from '../Context/movieContext';

export default function Movies() {
  
  const { movies, selectedGenresMovies, allGenresMovies, moviesTotalPages, currentPageMovies, isLoading } = useGlobalContext();

  return (
    <div className='movies'
      style={{ backgroundColor: '#E2E8F0', paddingTop: '6.5rem', height: 'auto', minHeight: '100vh'}}
    >
      {isLoading ? (<Loading/>) :
        (<>
          <div className="title-pages d-flex justify-content-between mb-2">
            <h4 className='page-title m-0'>Movies</h4>
            <span className='pages'>
              <span style={{marginRight: '5px', fontWeight: '600'}}>Page</span> 
              <span style={{fontWeight: 'normal'}}>{currentPageMovies}</span>/
              <span style={{fontWeight: 'normal'}}>{moviesTotalPages}</span>
            </span>
          </div>
      
          <Genres
            type='movie'
            selectedGenres={selectedGenresMovies}
            allGenres={allGenresMovies}
          />
          <Row className='w-100 m-0'>
              {movies.map((movie) =>
                  <Col className='col-item p-1'
                      xs={6} md={4} lg={3} xl={3} 
                      key={movie.id}
                  >
                  <SingleContent 
                      id={movie.id}
                      poster={movie.poster_path}
                      title={movie.title}
                      date={movie.release_date}
                      media_type='movie'
                      vote_average={movie.vote_average}
                  />
                  </Col>
              )}
          </Row>
          {moviesTotalPages > 1 &&
          (<CustomPagination 
              pageType='movie'
              totalPages={moviesTotalPages}
              currentPage={currentPageMovies}
          />)}
        </>)
      }
    </div>
  )
}