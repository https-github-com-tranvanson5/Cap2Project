import React, { useState } from 'react';
import styled from 'styled-components';
import { _LIMIT_PAGE } from '~/config/apis';

// import ReactDOM from "react-dom";
// import Pagination from '~/components/Pagination/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from 'react-js-pagination';
const PaginationStyled = styled.div`
    ul.pagination {
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;
        li {
            text-align: center;
            align-items: center;
            border-radius: 10px;
            width: 30px;
            height: 30px;
            a {
                color: #000;
                text-decoration: none;
            }
            :nth-child(2) {
                display: none;
            }
            :nth-last-child(2) {
                display: none;
            }
            /* :last-child {
            display: none;
        } */
        }
        .active {
            background-color: var(--secondary-color);
            a {
                color: #fff;
            }
        }
    }
`;
const PaginationCOM = ({ items, setjobsItem }) => {
    const [startPage, setStartPage] = useState(0);
    const [endPage, setEndPage] = useState(5);
    const [activePage, setActivePage] = useState(1);

    const handlePageChange = (pageNumber) => {
        let _pageBefore = 1;
        console.log('_pageBefore', _pageBefore);
        setActivePage(pageNumber);
        let start;
        let end;
        if (pageNumber === 1) {
            start = 0;
            end = _LIMIT_PAGE;
        } else {
            start = pageNumber * _LIMIT_PAGE - _LIMIT_PAGE;
            end = pageNumber * _LIMIT_PAGE;
        }
        setStartPage(start);
        setEndPage(end);
        const jobs = items.slice(start, end);
        setjobsItem(jobs);
    };

    return (
        <PaginationStyled>
            <Pagination
                activePage={activePage}
                itemsCountPerPage={_LIMIT_PAGE}
                totalItemsCount={items.length}
                pageRangeDisplayed={_LIMIT_PAGE}
                onChange={handlePageChange}
            />
        </PaginationStyled>
    );
};

export default PaginationCOM;
