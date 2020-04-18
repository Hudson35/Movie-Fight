const autoCompleteConfig = {
    renderOption(movie) {
        // Using a ternary operation, read like this: IF movie.Poster equals 'N/A' ? (then) -> assign an 
        // empty string to the value of imgSrc, : (else) if false -> assign movie.Poster to imgSrc
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
        return `
        <img src="${imgSrc}"/>
        ${movie.Title} (${movie.Year})
        `
    },
    inputValue(movie) {
        return movie.Title;
    },
    async fetchData(searchTerm) {
        // response object that will hold everything we get back
        const response = await axios.get('http://www.omdbapi.com/', {
            params: {
                apikey: 'e8665db8',
                s: searchTerm
            }
        });

        if (response.data.Error) {
            return [];
        }
        return response.data.Search;
    }
}

createAutoComplete({
    //the ... makes a copy of everything in autoCompleteConfig and brings it into this object
    ...autoCompleteConfig,
    root: document.querySelector('#left-autocomplete'),
    onOptionSelect(movie) {
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovieSelect(movie, document.querySelector('#left-summary'), 'left');
    }
});
createAutoComplete({
    //the ... makes a copy of everything in autoCompleteConfig and brings it into this object
    ...autoCompleteConfig,
    root: document.querySelector('#right-autocomplete'),
    onOptionSelect(movie) {
        document.querySelector('.tutorial').classList.add('is-hidden', 'right');
        onMovieSelect(movie, document.querySelector('#right-summary'));
    }
});


let leftMovie;
let rightMovie;

//helper function onMovieSelect
const onMovieSelect = async (movieObj, summaryElement, side) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: 'e8665db8',
            i: movieObj.imdbID
        }
    });
    summaryElement.innerHTML = movieTemplate(response.data);

    if (side === 'left') {
        leftMovie = response.data;
    }
    else {
        rightMovie = response.data;
    }

    if (leftMovie && rightMovie) {
        runComparison();
    }

};

// helper function
const runComparison = () => {
    const leftSideStats = document.querySelectorAll('#left-summary .notification');
    const rightSideStats = document.querySelectorAll('#right-summary .notification');

    leftSideStats.forEach((leftStat, index) => {
        const rightStat = rightSideStats[index];

        const leftSideValue = parseInt(leftStat.dataset.value);
        const rightSideValue = parseInt(rightStat.dataset.value);

        if (rightSideValue > leftSideValue) {
            leftStat.classList.remove('is-primary');
            leftStat.classList.add('is-danger');
        } else {
            rightStat.classList.remove('is-primary');
            rightStat.classList.add('is-danger');
        }
    });
};

//helper function movieTemplate
const movieTemplate = (movieDetailObj) => {
    const dollars = parseInt(movieDetailObj.BoxOffice.replace(/\$/g, '').replace(/,/g, ''));
    const metascore = parseInt(movieDetailObj.Metascore);
    const imdbRating = parseFloat(movieDetailObj.imdbRating);
    const imdbVotes = parseInt(movieDetailObj.imdbVotes.replace(/,/g, ''));

    const awards = movieDetailObj.Awards.split(' ').reduce((prev, word) => {
        const value = parseInt(word);
        if (isNaN(value)) {
            return prev;
        } else {
            return prev + value;
        }
    }, 0);
    console.log(awards);

    return `
        <article class="media">
            <figure class="media-left>
                <p class="image">
                    <img src="${movieDetailObj.Poster}"/>
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <h1>${movieDetailObj.Title}</h1>
                    <h4>${movieDetailObj.Genre}</h4>
                    <p>${movieDetailObj.Plot}</p>
                </div>  
            </div>
        </article>
        <article data-value=${awards} class="notification is-primary">
            <p class="title">${movieDetailObj.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>
        <article data-value=${dollars} class="notification is-primary">
            <p class="title">${movieDetailObj.BoxOffice}</p>
            <p class="subtitle">Box Office</p>
        </article>
        <article data-value=${metascore} class="notification is-primary">
            <p class="title">${movieDetailObj.Metascore}</p>
            <p class="subtitle">Metascore</p>
        </article>
        <article data-value=${imdbRating} class="notification is-primary">
            <p class="title">${movieDetailObj.imdbRating}</p>
            <p class="subtitle">IMDB Rating</p>
        </article>
        <article data-value=${imdbVotes} class="notification is-primary">
            <p class="title">${movieDetailObj.imdbVotes}</p>
            <p class="subtitle">IMDB Votes</p>
        </article>
        `;
};