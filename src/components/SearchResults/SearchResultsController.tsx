import React from 'react'
import SearchResultsView from './SearchResultsView'
import { useNavigate } from 'react-router-dom';

function SearchResultsController() {
    const navigate = useNavigate();

    // on clicking a recipe, it should send you to that recipe's page
    const onClick = (id: string) => {
        console.log('I have been clicked! from SearchResultsView.tsx');

        navigate(`/recipes/${id}`);
    }

    return (
        <SearchResultsView onClick={onClick}/>
    )
}

export default SearchResultsController