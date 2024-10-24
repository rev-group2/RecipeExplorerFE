import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBarSearchView from './NavBarSearchView';
import { RecipeType } from '../Types/recipeType';

const config = require("../../config");
const URL = `${config.path}`;

function NavBarSearchController() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState<string>('');

    async function search(data: { searchQuery: string, searchValue: string }) {
        try {
            // OUR API
            const response = await fetch(`${URL}/recipes/?${data.searchQuery}=${data.searchValue}`);
            
            if(!response.ok) {
                console.error(`Response status: ${response.status}`);
            }

            const json = await response.json(); // returns an array
            console.log(json);

            // MEALDB API
            const sanitizedData = sanitizeInputForMealDB(data); // console.log(sanitizedData) -> {searchQuery: 'a', searchValue: 'Canadian'}
            
            const mealDBResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?${sanitizedData.searchQuery}=${sanitizedData.searchValue}`);
            
            if(!mealDBResponse.ok) {
                console.error(`Response status: ${response.status}`);
            }

            const mealDBJson = await mealDBResponse.json(); // console.log(mealDBJson) -> meals: Meal[]

            if(!mealDBJson.meals) {
                mealDBJson.meals = [];
            }

            const searchResultData = [...json, ...mealDBJson.meals];

            navigate('/search-results', { state: { searchResultData: searchResultData } });
        } catch (error) {
            console.error(error);
        }
    }

    function sanitizeInputForMealDB(data: { searchQuery: string, searchValue: string }) {
        let sanitizedData: { searchQuery: string, searchValue: string } = {searchQuery: '', searchValue: ''};
        switch(data.searchQuery) {
            case 'category':
                sanitizedData.searchQuery = 'c';
                // capitalize first letter
                sanitizedData.searchValue = data.searchValue.charAt(0).toUpperCase() + data.searchValue.slice(1);
                break;
            case 'cuisine':
                sanitizedData.searchQuery = 'a';
                // capitalize first letter
                sanitizedData.searchValue = data.searchValue.charAt(0).toUpperCase() + data.searchValue.slice(1);
                break;
            case 'ingredients':
                sanitizedData.searchQuery = 'i';
                sanitizedData.searchValue = data.searchValue;
                break;
        }

        return sanitizedData;
    }

    return (
        <>
            <NavBarSearchView search={search}/>
        </>
    )
}

export default NavBarSearchController