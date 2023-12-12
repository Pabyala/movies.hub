import React from 'react'
import SingleContent from '../Components/SingleContent';
import { Col, Row } from 'react-bootstrap';
import CustomPagination from '../Components/CustomPagination';
import Loading from '../Components/Loading';
import './PagesStyle.css'
import { useGlobalContext } from '../Context/movieContext';

export default function Trending() {

    const { trendingMovieTVSeries, currentPageTrending, isLoading, trendingTotalPages } = useGlobalContext();

    return (
        <div className='trending' 
            style={{ backgroundColor: '#E2E8F0', paddingTop: '6.5rem', height: 'auto', minHeight: '100vh'}}
        >
            {isLoading ? (<Loading/>) :
                (<>
                    <div className="title-pages d-flex justify-content-between mb-2">
                        <h4 className='page-title m-0'>Trending</h4>
                        <span className='pages'>
                        <span style={{marginRight: '5px', fontWeight: '600'}}>Page</span> 
                        <span style={{fontWeight: 'normal'}}>{currentPageTrending}</span>/
                        <span style={{fontWeight: 'normal'}}>{10}</span>
                        </span>
                    </div>
                    <Row className='w-100 m-0'>
                        {trendingMovieTVSeries.map((trend) =>
                            <Col className='col-item p-1'
                                xs={6} md={4} lg={3} xl={3} 
                                key={trend.id}
                            >
                                <SingleContent 
                                    id={trend.id}
                                    poster={trend.poster_path}
                                    title={trend.title}
                                    date={trend.release_date}
                                    media_type={trend.media_type}
                                    vote_average={trend.vote_average}
                                />
                            </Col>
                        )}
                    </Row>
                    <CustomPagination
                        pageType='trending'
                        totalPages={trendingTotalPages}
                        currentPage={currentPageTrending}
                    />
                </>)
            }
        </div>
    )
}
