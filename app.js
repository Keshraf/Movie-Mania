let listContainer = document.querySelector(".games-list");
let list =[];
let urlOrigin = "https://api.themoviedb.org/3/movie/popular?api_key=3f2593c34bce745e1a5e4a7481f4dbba&language=en-US&page=1";
let button = document.querySelector("button");
let next = "";
let genreList = document.querySelectorAll(".genre-item");
console.log(genreList);
let search = document.querySelector("#search");
let k =1;
let locale = 0;
let gamesPanel = document.querySelector(".games-panel");



const hello = async (url) =>{
    const fetch = await axios.get(url);

    //console.log(fetch.data.results);
    //console.log(fetch);
    k++;
    next = `https://api.themoviedb.org/3/movie/popular?api_key=3f2593c34bce745e1a5e4a7481f4dbba&language=en-US&page=${k}`;
    createList(fetch.data.results);

    if(locale == 0){
        listContainer.addEventListener('scroll',function(e){
            if (this.offsetHeight + this.scrollTop>= this.scrollHeight) {  
                hello(next);
              }  
        })
    }
    locale = 0;
}

const createList = (result) =>{
    for(let i=0;i<20;i++){
        let obj = result[i];
        let name = obj.title;
        let media = obj.media_type
        /* if(obj.genres.length==0||obj.rating==0){
            continue;
        } */
        if(name === undefined){
            name = obj.name;
        }
        if(obj.media_type === "person"){
            continue;
        }

        let game = document.createElement("a");
        game.classList.add("game");
        game.setAttribute("href","./pages/index.html");

        let image = document.createElement("img");
        image.setAttribute("src",`https://image.tmdb.org/t/p/original/${obj.poster_path}`);

        game.append(image);

        let gameNameBox = document.createElement("div");
        gameNameBox.classList.add("game-name-box");

        let gameName = document.createElement("p");
        gameName.classList.add("game-name");
        gameName.innerText = `${name}`;

        gameNameBox.append(gameName);
        game.append(gameNameBox);

        listContainer.append(game);
        game.addEventListener('click' ,() =>{
            window.sessionStorage.setItem('selectedGame',result[i].id);
            if(media === undefined){
                window.sessionStorage.setItem('mediaType','movie');
            } else {
                window.sessionStorage.setItem('mediaType',obj.media_type);
            }  
        })
    }
}



hello(urlOrigin);

button.addEventListener('click', () => {
    hello(next);
})

const reset = () =>{
    listContainer.remove();
        listContainer = document.createElement("div");
        listContainer.classList.add("games-list");
        gamesPanel.append(listContainer);
}


for(let i=0;i<7;i++){
    genreList[i].addEventListener('click', () =>{
        genreList[i].classList.add("selected");
        reset();
        let urlGenre = `https://api.themoviedb.org/3/discover/movie?api_key=3f2593c34bce745e1a5e4a7481f4dbba&language=en-US&sort_by=popularity.desc&include_adult=false&page=1&with_genres=${genreList[i].id}&with_watch_monetization_types=flatrate`

        hello(urlGenre);

        for(let j=0;j<7;j++){
            if(j!==i){
                genreList[j].classList.remove("selected");
            }
        }
    })
}

search.addEventListener('change',() =>{
    let urlSearch = `https://api.themoviedb.org/3/search/multi?api_key=3f2593c34bce745e1a5e4a7481f4dbba&language=en-US&query=${search.value}&page=1&include_adult=false`;
    reset();
    for(let j=0;j<7;j++){
            genreList[j].classList.remove("selected");
    }
    locale = 1;
    hello(urlSearch);
})

