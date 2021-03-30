
let pokemonRepository= (function(){
    let pokemonList = [];

    let pokemon = "";
    
    
    pokemonList = [
    {
    name:"Bulbasaur",
    height:0.7,
    type:"grass"
    },
    {
    name:"Fearow",
    height:1.2,
    type:"flying"
    },
    {name:"Dragonair",
    height:4,
    type:"dragon"}
    ];
  
    function add(item){
        if(typeof item === "object"){
        pokemonList.push(item)
       }
       else alert("not possible")
    };

    function getAll(){
        return pokemonList
    }
    function addListItem(pokemon){
        let listPokemon = document.querySelector(".pokemon-list");
        let listItem = document.createElement("li")
         let button = document.createElement("button");
          button.innerText= pokemon.name ;
          button.classList.add(".button-class")
         listPokemon.appendChild(listItem);
         listItem.appendChild(button);

         button.addEventListener("click",function(event){
             showDetails(pokemon)
         });
        }
     function showDetails(pokemon){
         console.log(pokemon.name)
     }

    return {
        add: add,
        getAll: getAll,
        addListItem:addListItem
    }


})();


function findDragon(user){
    if(user.type === "dragon"){
        return user
    }
}


pokemonRepository.getAll().forEach(function(pokemon){
pokemonRepository.addListItem(pokemon);
});


let dragons=pokemonRepository.getAll().filter(findDragon);


