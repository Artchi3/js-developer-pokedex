class Pokemon{
    number;
    name;
    type;
    types = [];
    photo;  
    page =[];
} 

class Pokepage{  
    altura;
    peso;
    hablidade; 
    hp;
    atk;
    def;
    spAt;
    spDef;
    speed; 
    pokespecie=[]
}
// nested on  https://pokeapi.co/api/v2/pokemon-species/1/
class Pokespecies{
    genero
    egg = []; 
    pokeevolution = [];
}

// nested on https://pokeapi.co/api/v2/evolution-chain/1/
class Pokevolution{ 
    evchain = [];
}