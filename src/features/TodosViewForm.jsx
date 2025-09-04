export default function TodosViewForm({
    sortDirection,
    setSortDirection,
    sortField,
    setSortField,
    queryString,
    setQueryString,
}) {
    // define functions for handling change events in form
    function preventRefresh(event) {
        // prevent the page from refreshing
        event.preventDefault();
    }

    function handleSearchQuery(event) {
        setQueryString(event.target.value);
    }

    function handleClear() {
        setQueryString('');
    }

    function handleSortBy(event) {
        setSortField(event.target.value);
    }

    function handleSortDirection(event) {
        setSortDirection(event.target.value);
    }

    // build form with search, sortby, and sortdirection options for displaying todos
    return (
        <form onSubmit={preventRefresh}>
            <div>
                <label htmlFor="search">Search todos</label>
                <input
                    id="search"
                    type="text"
                    value={queryString}
                    onChange={handleSearchQuery}
                ></input>
                <button type="button" onClick={handleClear}>
                    Clear
                </button>
            </div>
            <div>
                <label htmlFor="sortBy">Sort by</label>
                {/* Add an onChange handler that uses an anonymous function that Takes the event object and Calls setSortField with the event target's value. */}
                <select id="sortBy" value={sortField} onChange={handleSortBy}>
                    <option value="title">Title</option>
                    <option value="createdTime">Time added</option>
                </select>
                <label htmlFor="sortDir">Direction</label>
                {/* Add an onChange handler that uses an anonymous function that Takes the event object and Calls setSortDirection with the event target's value. */}
                <select
                    id="sortDir"
                    value={sortDirection}
                    onChange={handleSortDirection}
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
        </form>
    );
}
