
let pokemonRepository= (function(){
    let pokemonList = [];

    let pokemon = "";
    
    
    pokemonList =[];
    let apiUrl= 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
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
          button.classList.add("button-class")
         listPokemon.appendChild(listItem);
         listItem.appendChild(button);

         button.addEventListener("click",function(event){
             showDetails(pokemon)
         });
        }
     function showDetails(pokemon){
         loadDetails(pokemon).then(function(){
             console.log(pokemon)
         })
     }

     function loadList(){
         return fetch(apiUrl).then(function(response){
             return response.json();
            }).then(function(json){
                 json.results.forEach(function(item){
                     let pokemon = {
                         name:item.name,
                         detailsUrl : item.url
                     };
                     add(pokemon);
                   });
                }).catch(function(e){
                console.error(e);
            })
     }
     function loadDetails(item){
         let url = item.detailsUrl;
         return fetch(url).then(function(response){
             return response.json();
         }).then(function(details){
              item.imageUrl = details.sprites.front_default;
              item.height = details.height;
              item.types = details.types
         }).catch(function(e){
             console.error(e)
         });
     }

    return {
        add: add,
        getAll: getAll,
        addListItem:addListItem,
        loadList: loadList,
        loadDetails:loadDetails
    }


})();


function findDragon(user){
    if(user.type === "dragon"){
        return user
    }
}

pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
})
});


let dragons=pokemonRepository.getAll().filter(findDragon);


