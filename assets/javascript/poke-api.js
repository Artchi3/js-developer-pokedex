const pokeApi = {}

function convertAPItoPokeData(pokeData){
    const pokemon = new Pokemon();
    console.log(pokeData.id)
    console.log(pokeData.id)
    pokemon.number= `${pokeData.id}`;
    pokemon.name = pokeData.name; 
    const types = pokeData.types.map((typeSlot)=>typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeData.sprites.other.home.front_default;
    pokemon.sprite = pokeData.sprites.other.showdown.front_default;
    // pokemon.altura = pokeData.height;
    // pokemon.peso = pokeData.weight;

    // const status = pokeData.stats.map((stat)=> stat.base_stat) 
    // const ability = pokeData.abilities.map((abilitie) => abilitie.ability.name) 

    // pokemon.hablidade = ability;
    // pokemon.hp = status[0];
    // pokemon.atk = status[1];
    // pokemon.def = status[2];
    // pokemon.spAt = status[3];
    // pokemon.spDef = status[4];
    // pokemon.speed = status[5];

    
    // pokemon.pokespecie = pokeData.species.url

    // // nested on  https://pokeapi.co/api/v2/pokemon-species/1/
    
    // pokemon.egg = 0; 
    // pokemon.genero = 0;
    // pokemon.pokeevolution = 0
    // // nested on https://pokeapi.co/api/v2/evolution-chain/1/
    // pokemon.evchain =0;
    
    return pokemon
}

// function pokeEspecies(pokeData){ 
    
//     const pokePage = new PokemonPage()
    
// }

// pokeApi.getPokePage = (pokeUrl)=>{
//     return fetch(pokeUrl.url)
//     .then((response) => response.json()) 
//     .then(convertAPItoPokeData)
// }


pokeApi.getPokemonData = (pokeUrl)=>{
    return fetch(pokeUrl.url)
    .then((response) => response.json()) 
    .then(convertAPItoPokeData) 
    
    // 1 mount pokePageClass
}
// pokeApi.getPokeSpecies = (pokeUrl)=>{

// }
pokeApi.getPokemons = (offset, limit)=>{
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
    .then((response) => response.json()) 
    // .then((jsonBody) => console.log(jsonBody.results))
    .then((jsonBody) => jsonBody.results)
    .then((pokeurls) => pokeurls.map(pokeApi.getPokemonData))
    .then((dataRequest) => Promise.all(dataRequest))
    .then((pokeData) =>  pokeData)
    .catch((error) => console.log(error))
}