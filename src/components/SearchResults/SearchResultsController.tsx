import React from 'react'
import SearchResultsView from './SearchResultsView'
import { useNavigate } from 'react-router-dom';

function SearchResultsController() {
    const navigate = useNavigate();

    // on clicking a recipe, it should send you to that recipe's page
    function onClick() {
        console.log('I have been clicked! from SearchResultsView.tsx');

        // TO BE IMPLEMENTED
        //navigate('/recipe-id');
    }

    return (
        <SearchResultsView onClick={onClick}/>
    )
}

export default SearchResultsController