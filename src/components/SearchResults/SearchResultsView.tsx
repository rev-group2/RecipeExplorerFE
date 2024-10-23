import React from 'react'
import { useLocation } from 'react-router-dom';
import { Recipe } from '../Home/HomeController'

function SearchResultsView(props: any) {
    const { state } = useLocation();
    console.log(state.searchResultData);

    function createSearchResultsList(data: any[]) {
        const listItems = data.map((item: any, index: number) => {
            return (
                <li key={index}>
                    {/* {item.strMeal} */}
                    
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