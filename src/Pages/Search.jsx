import React from 'react'
import Nav from 'react-bootstrap/Nav';
import { useState } from 'react';
import { useGlobalContext } from '../Context/movieContext';
import { Col, Row } from 'react-bootstrap';
import SingleContent from '../Components/SingleContent';
import CustomPagination from '../Components/CustomPagination';

export default function Search() {

    const [userType, setUserType] = useState(0)

    const handleSelect = (selectedKey) => {
        setUserType(selectedKey === 'option-2' ? 1 : 0);
    };
    const { searchResultMovies,
        searchResultTvSeries,
        searchTotalPagesMovies,
        searchTotalPagesTvSeries,
        currentPageSearchMovies,
        currentPageSearchTvSeries
    } = useGlobalContext();

    return (
        <div style={{ backgroundColor: '#E2E8F0', paddingTop: '6.5rem', height: 'auto', minHeight: '100vh'}}>
            <div className="title-pages d-flex justify-content-between mb-2">
                <h4 className='page-title m-0'>Search</h4>
                <span className='pages'>
                <span style={{marginRight: '5px', fontWeight: '600'}}>Page</span> 
                <span style={{fontWeight: 'normal'}}>{userType === 0 ? currentPageSearchMovies : currentPageSearchTvSeries}</span>/
                <span style={{fontWeight: 'normal'}}>{userType === 0 ? searchTotalPagesMovies : searchTotalPagesTvSeries}</span>
                </span>
            </div>
            <Nav 
                variant="underline" 
                defaultActiveKey="option-1" 
                onSelect={handleSelect}
            >
                <Nav.Item style={{ paddingBottom: '.5rem'}}>
                    <Nav.Link className='links'
                        style={{ padding: '0', }}
                        eventKey="option-1">Movie</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className='links' 
                        style={{ padding: '0', }}
                        eventKey="option-2">TV</Nav.Link>
                </Nav.Item>
            </Nav>

            {userType === 0 && (
                <>
                    <Row className='w-100 m-0'>
                        {searchResultMovies.map((search) =>
                            <Col className='col-item p-1'
                                xs={6} md={4} lg={3} xl={3} 
                                key={search.id}
                            >
                                <SingleContent 
                                    id={search.id}
                                    poster={search.poster_path}
                                    title={search.title}
                                    date={search.release_date}
                                    media_type='movie'
                                    vote_average={search.vote_average}
                                />
                            </Col>
                        )}
                    </Row>
                    {searchTotalPagesMovies > 1 &&
                        (<CustomPagination 
                            pageType='searchResultMovie'
                            totalPages={searchTotalPagesMovies}
                            currentPage={currentPageSearchMovies}
                        />)
                    }
                </>
            )}

            {userType === 1 && (
                <>
                    <Row className='w-100 m-0'>
                        {searchResultTvSeries.map((search) =>
                            <Col className='col-item p-1'
                                xs={6} md={4} lg={3} xl={3} 
                                key={search.id}
                            >
                                <SingleContent 
                                    id={search.id}
                                    poster={search.poster_path}
                                    title={search.name}
                                    date={search.first_air_date}
                                    media_type='tv'
                                    vote_average={search.vote_average}
                                />
                            </Col>
                        )}
                    </Row>
                    {searchTotalPagesTvSeries > 1 &&
                        (<CustomPagination 
                            pageType='searchResultTvSeries'
                            totalPages={searchTotalPagesTvSeries}
                            currentPage={currentPageSearchTvSeries}
                        />)
                    }
                </>
            )}
        </div>
    )
}

