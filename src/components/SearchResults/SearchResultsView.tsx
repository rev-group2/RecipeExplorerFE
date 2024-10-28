import React from 'react'
import { useLocation } from 'react-router-dom';
import { RecipeType } from '../Types/recipeType';
import { Meal } from '../Types/mealType';
import '../../styles/SearchResults/SearchResultsView.css';

function SearchResultsView(props: any) {
    const { state } = useLocation();
    // console.log(state.searchResultData);

    function showNoResultsFound() {
        return (
            <h3>No Search Results</h3>
        )
    }

    function createSearchResultsList(data: any[]) {
        const listItems = data.map((item: any, index: number) => {
            return (
                // <li key={index}>
                //     <div className="card my-1" style={{width: "24rem"}} onClick={props.onClick}>
                //         <img src={item.strMealThumb || item.recipeThumb} className="card-img-top" alt="..."/>
                //             <div className="card-body">
                //                 <h5 className="card-title">{item.strMeal || item.recipeName}</h5>
                //             </div>
                //     </div>
                // </li>
                <div className="card m-1" style={{width: "24rem"}} onClick={() => {props.onClick(item.idMeal || item.uuid)}} key={index}>
                        <img src={item.strMealThumb || item.recipeThumb} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">{item.strMeal || item.recipeName}</h5>
                            </div>
                    </div>
            )
        });

        return <ul className='search-results-container'>{listItems}</ul>
    }

    return (
        <>
            <h2>Search Results</h2>
            {state.searchResultData.length > 0 ? createSearchResultsList(state.searchResultData) : showNoResultsFound()}
        </>
    )
}

export default SearchResultsView