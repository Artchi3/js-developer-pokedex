const pokeApi = {}

// function convertAPItoPokeData(pokeData){
//     const pokemon = new Pokemon(); 
//     pokemon.number= `${pokeData.id}`;
//     pokemon.name = pokeData.name; 
//     const types = pokeData.types.map((typeSlot)=>typeSlot.type.name);
//     const [type] = types;

//     pokemon.types = types;
//     pokemon.type = type;

//     pokemon.photo = pokeData.sprites.other.home.front_default;
//     pokemon.sprite = pokeData.sprites.other.showdown.front_default;
//     // pokemon.altura = pokeData.height;
//     // pokemon.peso = pokeData.weight;

//     // const status = pokeData.stats.map((stat)=> stat.base_stat) 
//     // const ability = pokeData.abilities.map((abilitie) => abilitie.ability.name) 

//     // pokemon.hablidade = ability;
//     // pokemon.hp = status[0];
//     // pokemon.atk = status[1];
//     // pokemon.def = status[2];
//     // pokemon.spAt = status[3];
//     // pokemon.spDef = status[4];
//     // pokemon.speed = status[5];

    
//     // pokemon.pokespecie = pokeData.species.url

//     // 
    
//     // pokemon.egg = 0; 
//     // pokemon.genero = 0;
//     // pokemon.pokeevolution = 0
//     // 
//     // pokemon.evchain =0;
    
//     return pokemon
// }

async function convertAPItoPokeData(pokeData){ 
    const pokemon = new Pokemon(); 
    const pokePage = new Pokepage();  

    pokemon.number= `${pokeData.id}`;
    pokemon.name = pokeData.name; 
    const types = pokeData.types.map((typeSlot)=>typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeData.sprites.other.home.front_default; 
    pokemon.page = pokePage
    pokePage

    pokePage.altura = pokeData.height;
    pokePage.peso = pokeData.weight;

    const status = pokeData.stats.map((stat)=> stat.base_stat) 
    const ability = pokeData.abilities.map((abilitie) => abilitie.ability.name)  
    pokePage.hablidade = ability;
    pokePage.hp = status[0];
    pokePage.atk = status[1];
    pokePage.def = status[2];
    pokePage.spAt = status[3];
    pokePage.spDef = status[4];
    pokePage.speed = status[5];

    
    pokePage.pokespecie = await pokeApi.getPokeSpecies(pokeData.species.url)  
    console.log('pokemon',pokemon)
    return pokemon
}

function pokeEvolutionHandler(pokeData){ 
    const pokEvolution = new Pokevolution(); 
    const pokeEVhandler = [] ; 

    pokeEVhandler.push(pokeData.chain.species.name)
    if(pokeData.chain.evolves_to[0]){
        pokeEVhandler.push(pokeData.chain.evolves_to[0].species.name)
        if(pokeData.chain.evolves_to[0].evolves_to[0]){ 
            pokeEVhandler.push(pokeData.chain.evolves_to[0].evolves_to[0].species.name)
        }
    }
    pokEvolution.evchain = pokeEVhandler 

    return pokEvolution

}
async function pokeEspeciesHandler(pokeData){ 
    const pokeSpecies = new Pokespecies();   
    pokeSpecies.genero = pokeData.has_gender_differences ? 0: pokeData.gender_rate
    pokeSpecies.egg = pokeData.egg_groups.map((egg)=> egg.name) 
    pokeSpecies.pokeevolution = await pokeApi.getPokeEvolution(pokeData.evolution_chain.url) 
    
    return pokeSpecies
}

pokeApi.getPokeSpecies = (specUrl) =>{ 
    return fetch(specUrl)
    .then((response) => response.json())
    .then(pokeEspeciesHandler)  
}

pokeApi.getPokeEvolution = (pokeUrl)=>{
    return fetch(pokeUrl)
    .then((response) => response.json())
    .then(pokeEvolutionHandler)  
}


pokeApi.getPokemonData = (pokeUrl)=>{
    return fetch(pokeUrl.url)
    .then((response) => response.json()) 
    .then(convertAPItoPokeData) 
    
    // 1 mount pokePageClass
} 
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