export default function TodosViewForm({
    sortDirection,
    setSortDirection,
    sortField,
    setSortField,
}) {
    function preventRefresh(event) {
        // prevent the page from refreshing
        event.preventDefault();
    }
    return (
        <form onSubmit={preventRefresh}>
            <div>
                <label>Sort by</label>
                {/* Add an onChange handler that uses an anonymous function that Takes the event object and Calls setSortField with the event target's value. */}
                <select
                    value={sortField}
                    onChange={(event) => {
                        setSortField(event.target.value);
                    }}
                >
                    <option value="title">Title</option>
                    <option value="createdTime">Time added</option>
                </select>
                <label>Direction</label>
                {/* Add an onChange handler that uses an anonymous function that Takes the event object and Calls setSortDirection with the event target's value. */}
                <select
                    value={sortDirection}
                    onChange={(event) => {
                        setSortDirection(event.target.value);
                    }}
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
        </form>
    );
}
