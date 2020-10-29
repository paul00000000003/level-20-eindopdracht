function addMoviesToDom(filmSelectie) {
    let moviesPosters = filmSelectie.map(element => element.Poster);
    let moviesTitles = filmSelectie.map(element => element.Title);
    let ids = filmSelectie.map(element => element.imdbID);
    let filmLijst = document.getElementById("filmLijst");
    filmLijst.innerHTML = "";
    let basisref = "https://www.imdb.com/title/";
    let lis = filmSelectie.map(element => {
        let refDeelOpenen = '<a href="' + basisref + element.imdbID + '">';
        let plaatjesdeel = '<img src="' + element.Poster + '" width="100% alt="' + element.Title + '"/>';
        return '<li>' + refDeelOpenen + plaatjesdeel + '</a></li>'
    });
    lis.forEach(element => filmLijst.innerHTML += element);
    let plaatjes = document.getElementsByTagName("img");
    let plaatjesArr = Array.from(plaatjes);
    plaatjesArr.forEach(element => element.classList.add("plaatje"));
}

function handleOnChangeEvent(e) {

    if (e.target.value === "recent") {
        films = movies.filter(film => parseInt(film.Year.substring(0, 4)) >= 2014);
    } else {
        films = movies.filter(film => film.Title.toUpperCase().includes(e.target.value.toUpperCase()));
    }
    filmZoekTerm.value = "";
    addMoviesToDom(films);
}

// Onderstaande functie wordt aangeroepen als de pagina opnieuw wordt geladen (zie HTML voor de aanroep in de body)
// Als dit niet wordt gedaan, is de lijst leeg als je van de IMDB pagina naar deze pagina terug gaat. 
function checkFilmInhoud() {
    selectieKeuzeArr.forEach(element => {
        if (element.checked === true) {
            if (element.value === "recent") { films = movies.filter(film => parseInt(film.Year.substring(0, 4)) >= 2014); } else {
                films = movies.filter(film => film.Title.toUpperCase().includes(element.value.toUpperCase()));
            }
            addMoviesToDom(films);
        }
    });
    if (filmZoekTerm.value != "") {
        films = movies.filter(film => film.Title.toUpperCase().includes(filmZoekTerm.value.toUpperCase()));
        addMoviesToDom(films);
    }

}

function zoekFilmTitels(e) {
    console.log("zoek op titel");
    if (filmZoekTerm.value == "") {
        alert("Voor deze optie moet u een of meerdere woorden voor de titel invullen")
    } else {
        console.log("lengte : " + filmZoekTerm.value);
        if (filmZoekTerm.value.length < 5)
            alert("De zoekterm voor de film moet minimaal 5 karakters bevatten");
        else {
            films = movies.filter(film => film.Title.toUpperCase().includes(filmZoekTerm.value.toUpperCase()));
            console.log("aantal films : " + films.length);
            selectieKeuzeArr.forEach(element => { if (element.checked === true) element.checked = false; });
            addMoviesToDom(films);
        }
    }
}


let films = [];
let selectieKeuze = document.getElementsByClassName("radio");
let selectieKeuzeArr = Array.from(selectieKeuze);
let zoekFilm = document.getElementById("zoek-film-titel");
let filmZoekTerm = document.getElementById("film-titel");
zoekFilm.addEventListener("click", zoekFilmTitels);
selectieKeuzeArr.forEach(element => element.addEventListener('change', handleOnChangeEvent));