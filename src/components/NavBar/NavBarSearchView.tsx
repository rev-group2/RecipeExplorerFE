import React from 'react'

function NavBarSearch(props: any) {
    function submitHandler(event: any) {
        // Prevent the browser from reloading the page
        event.preventDefault();

        const form: HTMLFormElement = event.target;
        const formData: FormData = new FormData(form);

        const data = {
            searchQuery: formData.get("searchQuery") as string,
            searchValue: formData.get("searchValue") as string
        }; // console.log(data): {searchQuery: 'ingredient', searchValue: 'tomato'}

        props.search(data);
    }

    return (
        <>
            <form className="d-flex" onSubmit={submitHandler}>
                <select className="form-select mx-1" defaultValue="initial" name="searchQuery">
                    <option value="initial">Search Type</option>
                    <option value="category">Category</option>
                    <option value="cuisine">Cuisine</option>
                    <option value="ingredient">Ingredient</option>
                </select>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" name="searchValue" />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
        </>
    )
}

export default NavBarSearch