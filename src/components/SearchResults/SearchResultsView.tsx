import React from 'react'
import { useLocation } from 'react-router-dom';
import { Recipe } from '../Home/HomeController'

function SearchResultsView(props: any) {
    const { state } = useLocation();
    console.log(state.searchResultData);

    function createSearchResultsList(data: Recipe[]) {
        const listItems = data.map((item: Recipe, index: number) => {
            return (
                <li key={index} className="list-group-item">
                    {item.recipeName}
                </li>
            )
        });

        return <ul className="list-group">{listItems}</ul>
    }

  return (
    <>
        {state.searchResultData ? createSearchResultsList(state.searchResultData) : <p>Hello</p>}
    </>
  )
}

export default SearchResultsView