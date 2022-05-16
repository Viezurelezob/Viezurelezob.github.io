export default {
    search: function(searchTerm,searchLimit,sortBy) {
        return fetch(`http://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}&limit=${searchLimit}`) // cu return lasa ca functia search sa dea un promise
        .then(res => res.json())
        .then(data => data.data.children.map(data_1 => data_1.data)) // ne returneaza in consola continutul data din children
        .catch(err => console.log(err))
    }
}