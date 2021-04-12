//IIFE and repository of the project
let pokemonRepository= (function(){
    //empty array for push our items project
    let pokemonList = [];
    // items project
    let pokemon = "";
    let searchInput = document.querySelector("#searchIn");
    let loader= document.querySelector("#loading");
    
    // defined api key to a variable
    let apiUrl= 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    //defines modal container
    let modalContainer = document.querySelector('#modal-container');


// creating function for push items to our list
    function add(item){
        if(typeof item === "object"){
        pokemonList.push(item);
       }
       else alert("not possible")
    };

// creating function to return our list
    function getAll(){
        return pokemonList;
        
    }

  // creates and display items list and button 
    function addListItem(pokemon){
       let listPokemon = document.querySelector(".list-group");

        let listItem = document.createElement("li");        
        listItem.classList.add("list-group-item");
        listItem.classList.add("list-group-item-action");
         let button = document.createElement("button");
          button.innerText= pokemon.name ;
          button.classList.add("btn");
          button.classList.add("btn-dark");
          button.classList.add("btn-block")
        button.setAttribute("data-target","#pokemonModal")
        button.setAttribute("data-toggle","modal")
         listPokemon.appendChild(listItem);
         listItem.appendChild(button);

          //add event listener to our items button that show details
         button.addEventListener("click",function(event){
             showDetails(pokemon)
         });
        }

   //display items details 
     function showDetails(pokemon){
         loadDetails(pokemon).then(function(){
             showModal(pokemon)
         })
        };
    
        function showloading(){
            loader.classList.add("display");
            setTimeout(function(){
                loader.classList.remove("display");
            },5000);
        
        };


        function hideLOading(){
            loader.classList.remove("display");
        }
        
   // fetch list pokemon from our API
     function loadList(){
         showloading();
         return fetch(apiUrl).then(function(response){
             return response.json();
            }).then(function(json){
                hideLOading()
                 json.results.forEach(function(item){
                     let pokemon = {
                         name:item.name,
                         detailsUrl : item.url
                     };
                     add(pokemon);

                   });
                }).catch(function(e){
                    hideLOading()
                console.error(e);
            })
     };
function returnValue(object){
    for (let key of Object.keys(object)){
        let value = object[key].type.name;
        console.log(value);
    }
}
     //fetch details pokemon from our API
     function loadDetails(item){
        showloading()
         let url = item.detailsUrl;
         return fetch(url).then(function(response){
             return response.json();
         }).then(function(details){
            hideLOading()
              item.imageUrl = details.sprites.other.dream_world.front_default;
              item.height = details.height;
              item.types = details.types;
              returnValue(details.types);
         }).catch(function(e){
            hideLOading()
             console.error(e)
         });
     };
       
       
   
           //display a modal window whit pokemon clicked details
    function showModal(pokemon){
        let modalBody = document.querySelector(".modal-body");
        let modalTitle = document.querySelector(".modal-title");
        let modalHeader = document.querySelector(".modal-header");

        modalBody.innerHTML= "";
        modalTitle.innerHTML = "";

       let elementTitle = document.createElement("h1");
        elementTitle.innerText= pokemon.name
        modalTitle.appendChild(elementTitle);

        
       let elementHeight = document.createElement("p");
        elementHeight.innerText =` is ${pokemon.height} meter(s) tall and is a ${pokemon.value}`;
        modalBody.appendChild(elementHeight);

        let imageElement = document.createElement("img");
        modalBody.appendChild(imageElement);
        imageElement.src = pokemon.imageUrl;
        imageElement.classList.add("img-element")

     }
     
     searchInput.addEventListener('input', function(){
        let listPokemon = document.querySelectorAll('.list-group-item');
        let value = searchInput.value;

        listPokemon.forEach(function(pokemon){
            if(pokemon.innerText.indexOf(value) > -1){
                pokemon.style.display = '';
            }else{
                pokemon.style.display = 'none';
            }
        })
    });
     
     
    return{
        add: add,
        getAll: getAll,
        addListItem:addListItem,
        loadList: loadList,
        loadDetails:loadDetails,
        
        
    };


})();

    pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
    
})
});
