import React from 'react'
import ReactPaginate from 'react-paginate'
import './CustomPaginationStyle.css'
import { useGlobalContext } from '../Context/movieContext';

export default function CustomPagination({ totalPages, pageType, currentPage }) {

    const { handlePageChange } = useGlobalContext();

    return (
        <>
            <ReactPaginate
                className='react-paginate'
                previousLabel={'<<'}
                nextLabel={'>>'}
                breakLabel={'...'}
                pageCount={totalPages}
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
                onPageChange={(selectedPage) => handlePageChange(selectedPage, pageType)}
                forcePage={currentPage - 1}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                activeClassName={'active'}
            />
        </>
    )
}
