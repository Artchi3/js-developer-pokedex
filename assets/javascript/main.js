const pokemonTable = document.getElementById('poketable')
const loadmorebtn = document.getElementById('loadmore') 


const maxrecord = 1025   
const limit = 32
let offset = 0  

function convertPokeLi(pokemon){
    const pkpage = pokemon.page;
    const species = pokemon.page.pokespecie;
    const evchain = pokemon.page.pokespecie.pokeevolution.evchain.toString().replaceAll(',',' > ');
    const totalStats = (pokemon.page.hp+pokemon.page.atk+pokemon.page.def+pokemon.page.spAt+pokemon.page.spDef+pokemon.page.speed);

    return `
                <li onclick="pokePage(this)" id="${pokemon.number}" class="pokemon ${pokemon.type}">
                    <div class="pokebase"> 
                        <span class="pokenumber">
                            #${pokemon.number.padStart(4, '0')}
                        </span>
                        <span class="pokename">${pokemon.name}</span>
                        <button onclick="window.event.cancelBubble = true; closePoke()" id="closer"></button>
                    </div>
                    <div class="pokedetails">
                        <ol class="poketypes"> 
                            ${pokemon.types.map((type)=>`<li class="type ${type}"> ${type} </li> `).join('')} 
                        </ol>
                        <img class="pokespriteB" src="${pokemon.photo}" alt="${pokemon.name}">
                        <img class="pokespriteA" src="${pokemon.photo}" alt="${pokemon.name}">
                    </div> 
                    <div class="pokepage"> 
                        <ul class="pokepageHeader">
                            <li onclick="navData(this)" dataid="${pokemon.number}" datanav="about" id="navGateAbout${pokemon.number}" class="navGate${pokemon.number} isActive">About</li>
                            <li onclick="navData(this)" dataid="${pokemon.number}" datanav="stats" id="navGateStats${pokemon.number}" class="navGate${pokemon.number}">Base Stats</li>
                            <li onclick="navData(this)" dataid="${pokemon.number}" datanav="evolution" id="navGateEvolution${pokemon.number}" class="navGate${pokemon.number}">Evolution</li>
                        </ul>
                        <ul id="about${pokemon.number}" class="pokeinput${pokemon.number} about isActive">
                            <li class="data">
                                <p>Specie</p>
                                <b>${species.egg[species.egg.length-1]}</b>
                            </li>
                            <li class="data">
                                <p>Height</p>
                                <b>${pkpage.altura}</b>
                            </li>
                            <li class="data">
                                <p>Weight</p>
                                <b>${pkpage.peso}</b>
                            </li>
                            <li class="data">
                                <p>Abilities</p>
                                <b>${pkpage.hablidade}</b>
                            </li>
                            <span>BREEDING</span>
                            <li class="data">
                                <p>Gender</p>
                                ${
                                    species.genero != 1 ? "<b>Genero Unico</b>":"<b>♂ "+(100-species.genero)+" ♀"+species.genero+"</b>"
                                }
                            </li>
                            <li class="data">
                                <p>EggGroup</p>
                                <b>${species.egg[0]}</b>
                            </li>
                            <li class="data">
                                <p>EggCycle</p>
                                <b>${species.egg[1]? species.egg[1]:species.egg[0]}</b>
                            </li>
                        </ul>
                        <ul id="stats${pokemon.number}" class="pokeinput${pokemon.number} stats ">
                            <li class=" data">
                                <p>HP</p>
                                <b>${pokemon.page.hp}</b> 
                                <div class="hp">
                                    <label style="width:${pokemon.page.hp}px !important"></label>
                                </div>
                            </li>
                            <li class=" data">
                                <p>ATK</p>
                                <b>${pokemon.page.atk}</b> 
                                <div class="atk">
                                    <label style="width:${pokemon.page.atk}px !important"></label>
                                </div>
                            </li>
                            <li class=" data">
                                <p>DEF</p>
                                <b>${pokemon.page.def}</b> 
                                <div class="def">
                                    <label style="width:${pokemon.page.def}px !important"></label>
                                </div>
                            </li>
                            <li class=" data">
                                <p>SP.ATK</p>
                                <b>${pokemon.page.spAt}</b> 
                                <div class="spatk">
                                    <label style="width:${pokemon.page.spAt}px !important"></label>
                                </div>
                            </li>
                            <li class=" data">
                                <p>SP.DEF</p>
                                <b>${pokemon.page.spDef}</b> 
                                <div class="spdef">
                                    <label style="width:${pokemon.page.spDef}px !important"></label>
                                </div>
                            </li>
                            <li class=" data">
                                <p>SPEED</p>
                                <b>${pokemon.page.speed}</b> 
                                <div class="speed">
                                    <label style="width:${pokemon.page.speed}px !important"></label>
                                </div>
                            </li>
                            <li class=" data">
                                <p>TOTAL</p>
                                <b>${totalStats}</b> 
                                <div class="total">
                                    <label style="width:${totalStats}px !important"></label>
                                </div>
                            </li>
                        </ul>
                        <ul id="evolution${pokemon.number}" class="pokeinput${pokemon.number} evolution ">
                            <li class="data">
                                <p>${evchain}</p> 
                            </li> 
                        </ul> 
                    </div>
                </li>  
        ` 
}
function loadMorePokes(offset, limit){  
    pokeApi.getPokemons(offset, limit).then((pokemons = []) =>{  
        const newHtml = pokemons.map(convertPokeLi).join('') 
        pokemonTable.innerHTML += newHtml  
    })  
} 

loadMorePokes(offset, limit) 

// 2 mount pokepage element on click & toggle card into viewModel
function pokePage(e) {
    const pokeId =  e.getAttribute('id')  
    document.getElementById(pokeId).classList.add("isOpen"); 
    document.getElementById('poketable').classList.add("isOpen"); 

} 

function closePoke(){
    const isOpen = document.querySelectorAll('.isOpen')
    if(isOpen.length != 0){  
        for (let i = 0; i < isOpen.length; i++) {
            const element = isOpen[i]; 
            element.classList.toggle("isOpen");  
        } 
    }  
}

function navData(e) {
    const navId =  e.getAttribute('id')
    const navClass =  e.getAttribute('class')
    const navDataId =  e.getAttribute('dataid')
    const datanav =  e.getAttribute('datanav')
    const querySelect = `${datanav}${navDataId}`
    const navisActive = document.querySelectorAll(`.${navClass}.isActive`) 
    const divisActive = document.querySelectorAll(`.pokeinput${navDataId}.isActive`) 
    

     
    if(navisActive.length != 0 && divisActive.length != 0 ){  
        for (let i = 0; i < navisActive.length; i++) {
            const element = navisActive[i];
            element.classList.remove("isActive"); 
        } 
        for (let i = 0; i < divisActive.length; i++) {
            const element = divisActive[i];
            element.classList.remove("isActive"); 
        } 
        document.getElementById(navId).classList.add("isActive");
        document.getElementById(querySelect).classList.add("isActive");
    }else{ 
        document.getElementById(navId).classList.add("isActive");
        document.getElementById(querySelect).classList.add("isActive");
    } 
}

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
// 2 mount pokepage element on click & toggle card into viewModel

// document.addEventListener('DOMContentLoaded', (e)=>{ 
// })

