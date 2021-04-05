//IIFE and repository of the project
let pokemonRepository= (function(){
    //empty array for push our items project
    let pokemonList = [];
    // items project
    let pokemon = "";

    let loader= document.querySelector("#loading");
    
    // defined api key to a variable
    let apiUrl= 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    //defines modal container
    let modalContainer = document.querySelector('#modal-container');


// creating function for push items to our list
    function add(item){
        if(typeof item === "object"){
        pokemonList.push(item)
       }
       else alert("not possible")
    };

// creating function to return our list
    function getAll(){
        return pokemonList;
        
    }

  // creates and display items list and button 
    function addListItem(pokemon){
        let listPokemon = document.querySelector(".pokemon-list");
        let listItem = document.createElement("li")
         let button = document.createElement("button");
          button.innerText= pokemon.name ;
          button.classList.add("button-class")
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

     //fetch details pokemon from our API
     function loadDetails(item){
        showloading()
         let url = item.detailsUrl;
         return fetch(url).then(function(response){
             return response.json();
         }).then(function(details){
            hideLOading()
              item.imageUrl = details.sprites.front_default;
              item.height = details.height;
              item.types = details.types
         }).catch(function(e){
            hideLOading()
             console.error(e)
         });
     };


     function findDragon(user){
        if(user.type === "dragon"){
            console.log(user)
        }
    } 
           //display a modal window whit pokemon clicked details
    function showModal(pokemon){
        let modalContainer = document.querySelector("#modal-container");

        modalContainer.innerHTML= "";

        let modal= document.createElement("div");
        modal.classList.add("modal");

        let closeButtonElement = document.createElement("button");
        closeButtonElement.classList.add("modal-close");
        closeButtonElement.innerText = "close";
        closeButtonElement.addEventListener("click",hideModal);

        let titleElement = document.createElement("h1");
        titleElement.innerText = pokemon.name;

        let contentElement = document.createElement("p");
        contentElement.innerText = `${pokemon.height} meters tall`;

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modalContainer.appendChild(modal);

        let imageElement = document.createElement("img");
        modal.appendChild(imageElement);
        imageElement.src = pokemon.imageUrl;
        imageElement.classList.add("img-element");

        modalContainer.classList.add("is-visible");

     }
        // hide the modal window
     function hideModal(){
         let modalContainer = document.querySelector("#modal-container");
         modalContainer.classList.remove("is-visible");
     }

    document.querySelector("#show-modal").addEventListener("click", function(){
        showModal("Modal-Title","This is the modal content");
    })

    window.addEventListener("keydown",function(e){
        let modalContainer = document.querySelector("#modal-container");
        if(e.key === "Escape" && modalContainer.classList.contains("is-visible")){
            hideModal();
        }
        
    })
    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
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
