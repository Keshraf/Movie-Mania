const config = {
    type: 'carousel',
    gap:-1000,
    autoplay:true,
    perView: 3,
    animationDuration:2000
}
new Glide('.glide',config).mount()

function reportWindowSize() {
    let width = window.innerWidth;
    console.log("WIDTH:",width)
    if(width <= 1600){
        let mount = {gap:-900};
        new Glide('.glide',mount).mount()
        console.log("TRIGGRED 1600");
    }
  }
window.onresize = reportWindowSize;

/* MENU BUTTON */
const genrePanel = document.querySelector('.genre-panel');
const overlay = document.querySelector('.overlay');
const cross = document.querySelector('#cross');
const scrollButton = document.querySelector(".up-button");
scrollButton.style.visibility = "hidden";
const viewHeight = window.innerHeight;
const scrollCheck = window.addEventListener('scroll', function(){
    let scrollPosition = window.scrollY;
    if(scrollPosition<(viewHeight/2)){
        scrollButton.style.visibility = "hidden";
    }
    else{
        scrollButton.style.visibility = "visible";
    }
})
scrollButton.addEventListener('click', () =>{
    genrePanel.style.display = 'block';
    overlay.style.display = 'block';
})
cross.addEventListener('click',()=>{
    genrePanel.style.display = 'none';
    overlay.style.display = 'none';
})

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
        let urlGenre = `https://api.themoviedb.org/3/discover/movie?api_key=3f2593c34bce745e1a5e4a7481f4dbba&language=en-US&sort_by=popularity.desc&include_adult=false&page=1&with_genres=${genreList[i].id}&with_watch_monetization_types=flatrate`;
        if(window.innerWidth < 700){
            genrePanel.style.display = 'none';
            overlay.style.display = 'none';
        }

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

