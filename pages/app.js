


const rating = document.querySelector("h2");
const ratingBar = document.querySelector(".rating-bar");
const description = document.querySelector(".des-text");
const release = document.querySelector("#release");
const genres = document.querySelector("#genres");
const web = document.querySelector("#web");
const webAnchor = document.querySelector("#web-anchor");
const bookmark = document.querySelector('#bookmark');
let obj;
let obj2;
let obj3;

const poster = document.querySelector('#poster');
const bgImg = document.querySelector('#bg-img');
const cast = document.querySelector('#cast-list');
const similar = document.querySelector('#similar');
const similarH2 = document.querySelector('#similar-h2');

let game = window.sessionStorage.getItem('selectedGame');
let media = window.sessionStorage.getItem('mediaType');
let heading = document.querySelector("h1");

const hello = async () =>{
    const fetch = await axios.get(`https://api.themoviedb.org/3/${media}/${game}?api_key=3f2593c34bce745e1a5e4a7481f4dbba&language=en-US`);
    obj=fetch.data;
    let name = obj.title;
    if(obj.title === undefined){
        name = obj.name;
    }
    similarH2.innerText = `SIMILAR ${media.toUpperCase()}`;

    document.title = name;
    heading.innerText = name;

    poster.setAttribute('src',`https://image.tmdb.org/t/p/original${obj.poster_path}`)
    bgImg.setAttribute('src',`https://image.tmdb.org/t/p/original${obj.backdrop_path}`)

    rating.innerText = `RATING: ${obj.vote_average}`;
    ratingBar.style.width = `${(((obj.vote_average)/10.0)*100)}%`;
    description.innerText = `${obj.overview}`;
    release.innerText = `${obj.release_date}`;
    if(obj.release_date === undefined){
    release.innerText = `${obj.first_air_date}`;
    }

    let genresList = obj.genres;
    for(let i=0;i<genresList.length;i++){
        if(i==genresList.length-1){
            genres.innerText = `${genres.innerText} ${genresList[i].name}.`;  
            continue;
        }
        genres.innerText = `${genres.innerText} ${genresList[i].name},`; 
    }

    web.innerText = `${obj.homepage}`;
    webAnchor.setAttribute('href',`${obj.homepage}`);
    if(obj.homepage === ''||obj.homepage === null || obj.homepage === undefined){
        document.querySelector('#web-heading').remove();
    }

    let chosenShows = window.sessionStorage.getItem('bookmark');
    if(chosenShows !== null){
        let showsArray = chosenShows.split(',');
        for(let x = 0;x<showsArray.length;x++){
        if(showsArray[x]===game){
            bookmark.setAttribute('src','../images/bookmark-filled.png');
        }
    }
    }
    

    bookmark.addEventListener('click',() => {

        if(bookmark.getAttribute('src') === '../images/bookmark (1) 1.png'){
            bookmark.setAttribute('src','../images/bookmark-filled.png');
        } else{
            bookmark.setAttribute('src','../images/bookmark (1) 1.png');
        }

        let words = ""; // Stores the each id by
        let word = []; // Stores all the ids
        let i = 0;
        let test = window.sessionStorage.getItem('bookmark');
        if(test === null || test === ''){
            window.sessionStorage.setItem('bookmark',`${game},`);
        }
        else{
            word = test.split(',');
            console.log("Word",word);//"550988","438631",
            for(let x = 0;x<word.length;x++){
                if(word[x] === game){
                    i = 1;
                    continue;
                }
                if(word[x] === ''){
                    continue;
                }
                words = `${words}${word[x]},`;
            }
            if(i==0){
                window.sessionStorage.setItem('bookmark',`${words}${game},`);
            } else{
                window.sessionStorage.setItem('bookmark',`${words}`);
            }
        }
        console.log(window.sessionStorage.getItem('bookmark'));
    })

    const fetch2 = await axios.get(`https://api.themoviedb.org/3/${media}/${game}/credits?api_key=3f2593c34bce745e1a5e4a7481f4dbba&language=en-US`);
    obj2=fetch2.data.cast;
    createList2(obj2);

    const fetch3 = await axios.get(`https://api.themoviedb.org/3/${media}/${game}/similar?api_key=3f2593c34bce745e1a5e4a7481f4dbba&language=en-US`);
    obj3=fetch3.data.results;
    createList(obj3);

}

const createList2 = (result) =>{
    for(let i=0;i<4;i++){
        let objx = result[i];
        let name = objx.name;

        let game = document.createElement("div");
        game.classList.add("game");

        let image = document.createElement("img");
        image.setAttribute("src",`https://image.tmdb.org/t/p/original${objx.profile_path}`);

        game.append(image);

        let gameNameBox = document.createElement("div");
        gameNameBox.classList.add("game-name-box");

        let gameName = document.createElement("p");
        gameName.classList.add("game-name");
        gameName.innerText = `${name}`;

        gameNameBox.append(gameName);
        game.append(gameNameBox);

        cast.append(game);
    }
}


const createList = (result) =>{
    for(let i=0;i<4;i++){
        let objx = result[i];
        let name = objx.title;

        if(name === undefined){
            name = objx.name;
        }
        if(obj.media_type === "person"){
            continue;
        }

        let game = document.createElement("a");
        game.classList.add("game");
        game.setAttribute("href","./index.html");

        let image = document.createElement("img");
        image.setAttribute("src",`https://image.tmdb.org/t/p/original${objx.poster_path}`);

        game.append(image);

        let gameNameBox = document.createElement("div");
        gameNameBox.classList.add("game-name-box");

        let gameName = document.createElement("p");
        gameName.classList.add("game-name");
        gameName.innerText = `${name}`;

        gameNameBox.append(gameName);
        game.append(gameNameBox);
        similar.append(game);
        game.addEventListener('click' ,() =>{
            window.sessionStorage.setItem('selectedGame',result[i].id);
                window.sessionStorage.setItem('mediaType',media);  
        })
    }
}




hello();



