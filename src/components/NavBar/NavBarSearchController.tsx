import React, { useState } from 'react'
import NavBarSearchView from './NavBarSearchView';

const config = require("../../config");
const URL = `${config.path}`;

function NavBarSearchController() {
    const [searchQuery, setSearchQuery] = useState<string>('');

    async function search(data: { searchQuery: string, searchValue: string }) {
        try {
            const response = await fetch(`${URL}/recipes/?${data.searchQuery}=${data.searchValue}`);
            
            if(!response.ok) {
                console.error(`Response status: ${response.status}`);
            }

            const json = await response.json(); // returns an array
            console.log(json);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <NavBarSearchView search={search}/>
        </>
    )
}

export default NavBarSearchController