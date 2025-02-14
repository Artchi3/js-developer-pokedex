const pokemonTable = document.getElementById('poketable')
const loadmorebtn = document.getElementById('loadmore')
const maxrecord = 1025   
const limit = 6
let offset = 0

function loadMorePokes(offset, limit){  
    pokeApi.getPokemons(offset, limit).then((pokemons = []) =>{  
        const newHtml = pokemons.map((pokemon) => `
                <li class="pokemon ${pokemon.type}">
                    <div class="pokebase">
                        <span class="pokenumber">
                            ${pokemon.number}
                        </span>
                        <span class="pokename">${pokemon.name}</span>
                    </div>
                    <div class="pokedetails">
                        <ol class="poketypes"> 
                            ${pokemon.types.map((type)=>`<li class="type ${type}"> ${type} </li> `).join('')} 
                        </ol>
                        <img class="pokesprite" src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>
                </li>  
                `).join('');  
        pokemonTable.innerHTML += newHtml  
    })
}
loadMorePokes(offset, limit)
loadmorebtn.addEventListener('click', () =>{
    offset += limit
    const qtdRecPage = offset+limit
    if (qtdRecPage >= maxrecord) {
        const newLimit = qtdRecPage - maxrecord
        loadMorePokes(offset, newLimit)
        
        loadmorebtn.parentElement.removeChild(loadmorebtn)
        return
    }else{
        loadMorePokes(offset, limit)
    }

})
