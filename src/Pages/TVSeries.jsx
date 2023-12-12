import React  from 'react'
import { Col, Row } from 'react-bootstrap'
import Genres from '../Components/Genres';
import SingleContent from '../Components/SingleContent';
import CustomPagination from '../Components/CustomPagination';
import Loading from '../Components/Loading';
import './PagesStyle.css'
import { useGlobalContext } from '../Context/movieContext';

export default function TVSeries() {

  const { tvSeries, selectedGenresTvSeries, allGenresTvSeries, TvSeriesTotalPages, currentPageTvSeries, isLoading } = useGlobalContext()
  
  return (
    <div style={{ backgroundColor: '#E2E8F0', paddingTop: '6.5rem', height: 'auto', minHeight: '100vh'}}>
      {isLoading ? (<Loading/>) :
        (<>
          <div className="title-pages d-flex justify-content-between mb-2">
            <h4 className='page-title m-0'>TVSeries</h4>
            <span className='pages'>
              <span style={{marginRight: '5px', fontWeight: '600'}}>Page</span> 
              <span style={{fontWeight: 'normal'}}>{currentPageTvSeries}</span>/
              <span style={{fontWeight: 'normal'}}>{TvSeriesTotalPages}</span>
            </span>
          </div>
          <Genres
            type='tv'
            selectedGenres={selectedGenresTvSeries}
            allGenres={allGenresTvSeries}
          />
          <Row className='w-100 m-0'>
            {tvSeries.map((series) =>
              <Col className='col-item p-1'
                xs={6} md={4} lg={3} xl={3} 
                key={series.id}
              >
                <SingleContent 
                  id={series.id}
                  poster={series.poster_path}
                  title={series.name}
                  date={series.first_air_date}
                  media_type='tv'
                  vote_average={series.vote_average}
                />
              </Col>
            )}
          </Row>
          {TvSeriesTotalPages > 1 &&
          (<CustomPagination 
              pageType='tv'
              totalPages={TvSeriesTotalPages}
              currentPage={currentPageTvSeries}
          />)}
        </>)
      }
    </div>
  )
}
