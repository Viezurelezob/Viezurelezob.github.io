import reddit from './redditapi.js'


const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')

// Form Event listener
searchForm.addEventListener('submit',e => {// cand se da click pe search,se executa eventul submit
    //Get search term
    const searchTerm = searchInput.value

    //Get sort
    const sortBy = document.querySelector('input[name="sortby"]:checked').value // ne trebe toate inputurile dar doar alea care sunt chekced

    //Get limit
    const searchLimit = document.querySelector('#limit').value
    console.log(searchLimit)

    //Check input, vrem sa nu putem da click pe buton daca nu am scris nimic
    if (searchTerm ==='') {
        //Show message
        showMessage('Please add a search term', 'alert-danger')
    } 

    // Clear input
    searchInput.value = ''

    //Search Reddit
    setTimeout(search, 2100)
    reddit.search(searchTerm,searchLimit,sortBy)// ne returneaza un promise pe care l-am facut in redditapi.js
    .then(results => {
        console.log(results)
        let output = '<div class="card-columns">'

        // Loop through posts
        results.forEach(post => {
            let image;

            if (post.preview) {
                image = post.preview.images[0].source.url;
            } else {
                image = 'https://dojotech.ro/wp-content/uploads/2017/08/Reddit-testeaza-incarcarile-directe-de-clipuri-video-pe-site-ul-sau.jpg';
            }

            output += `
            <div class="card">
                <img class="card-img-top" src="${image}" alt="Card image cap">

                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5> 
                    <p class="card-text">${truncateText(post.selftext,10)}</p>
                    <a href="${post.url}" target="_blank" class="btn btn-primary">Read More</a>
                
                    <hr>
                
                    <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
                    <span class="badge badge-dark">Subreddit: ${post.score}</span>
                    
                    </div>
            </div>
            `
        })
        output += '</div>'
        document.querySelector('#results').innerHTML = output // results o sa le puna in innerHTML , iar apoi o sa le atribuie lui output, care ne va afisa card urile bootstrap
        
    })

    e.preventDefault()// prevent that form to submiting to a file
})

// Show Message //  daca nu scriem nimic si apasam pe search

function showMessage(message, className){
    // Create div
    const div = document.createElement('div')

    // Add classes
    div.className = `alert ${className}`

    // Add text
    div.appendChild(document.createTextNode(message))

    // Get the parent container
    const searchContainer = document.querySelector('#search-container')

    // Get search 
    const search = document.querySelector('#search')

    // Insert the message
    searchContainer.insertBefore(div,search)

    //Timout alert
    setTimeout(() => document.querySelector('.alert').remove(),3000)

}


// Truncate Text - functie care scurteaza textul
function truncateText(text,limit){
    const shortened = text.indexOf(' ', limit)// nu vrem sa ne taie lungimea textului in mijlocul cuvantului
    if(shortened == -1) return text // daca indexOf nu matchuieste space ul o sa dea return la -1
    return text.substring(0,shortened) 
}


