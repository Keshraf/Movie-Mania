
const shows = window.sessionStorage.getItem('bookmark');
const showsArray = shows.split(',');
const listContainer = document.querySelector('.games-list');
const testImage = document.querySelector('#nothing');
let fetch;

if(shows !== null || shows !== ''){
    testImage.style.display = 'none';
}

const hello = async () =>{
    for(let x = 0; x < showsArray.length; x++){
        if(showsArray[x]===''||showsArray[x]===null){
            console.log("INSIDE IF");
            continue;
        }
        console.log(showsArray[x]);
        try {
            console.log("INTRY");
            fetch = await axios.get(`https://api.themoviedb.org/3/movie/${showsArray[x]}?api_key=3f2593c34bce745e1a5e4a7481f4dbba&language=en-US`);
            
        } catch (error) {
            fetch = await axios.get(`https://api.themoviedb.org/3/tv/${showsArray[x]}?api_key=3f2593c34bce745e1a5e4a7481f4dbba&language=en-US`);
        }
        createList(fetch.data);
    }    
}

const createList = (result) =>{
        let obj = result;
        let name = obj.title;
        let media = obj.media_type
        /* if(obj.genres.length==0||obj.rating==0){
            continue;
        } */
        if(name === undefined){
            name = obj.name;
        }

        let game = document.createElement("a");
        game.classList.add("game");
        game.setAttribute("href","../pages/index.html");

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
            window.sessionStorage.setItem('selectedGame',obj.id);
            if(media === undefined){
                if(obj.first_air_date === undefined){
                    window.sessionStorage.setItem('mediaType','movie');
                } else{
                    window.sessionStorage.setItem('mediaType','tv');
                }
            } else {
                window.sessionStorage.setItem('mediaType','movie');
            }  
        })
}

hello();