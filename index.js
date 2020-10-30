function addMoviesToDom(filmSelectie) {
    let filmLijst = document.getElementById("filmLijst");
    filmLijst.innerHTML = ""; /* eenvoudigste manier om de lijst leeg te maken */
    let basisref = "https://www.imdb.com/title/";

    filmSelectie.forEach(film => {
        /* de onderstaand code is wellicht niet gesuggereerd, maar ik vind het wel het meest leesbaar */
        let poster = document.createElement('img');
        poster.setAttribute("src", film.Poster);
        poster.setAttribute("alt", film.title);
        poster.setAttribute("width", "100%");
        poster.classList.add("poster");
        let aref = document.createElement("a");
        aref.setAttribute("href", basisref + film.imdbID);
        aref.appendChild(poster);
        let ulListItem = document.createElement("li");
        ulListItem.appendChild(aref);
        filmLijst.appendChild(ulListItem);
    })
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
    if (filmZoekTerm.value == "") {
        alert("Voor deze optie moet u een of meerdere woorden voor de titel invullen")
    } else {
        console.log("lengte : " + filmZoekTerm.value);
        if (filmZoekTerm.value.length < 5)
            alert("De zoekterm voor de film moet minimaal 5 karakters bevatten");
        else {
            films = movies.filter(film => film.Title.toUpperCase().includes(filmZoekTerm.value.toUpperCase()));
            selectieKeuzeArr.forEach(element => { if (element.checked === true) element.checked = false; });
            if (films.length === 0) {
                alert("Op basis van de door u opgegeven zoekstrings zijn geen films gevonden");
                filmZoekTerm.value = "";
            } else { addMoviesToDom(films); }
        }
    }
}


let films = [];
let selectieKeuze = document.getElementsByClassName("radio");
let selectieKeuzeArr = Array.from(selectieKeuze);
let zoekFilm = document.getElementById("zoek-film-titel");
let filmZoekTerm = document.getElementById("film-titel");
/*let body = document.querySelector("body");
body.onload = checkFilmInhoud();*/
zoekFilm.addEventListener("click", zoekFilmTitels);
selectieKeuzeArr.forEach(element => element.addEventListener('change', handleOnChangeEvent));