
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


    return {
        add: add,
        getAll: getAll
    }


})();



function loopFunction(user){
    if(user.height > 1){
        document.write(`<h1>${user.name}</h1> <p><strong> height:</strong> ${user.height} WOW! Is Bigger then one Meter!</p><br>`)
    }
    else{
        document.write(`<h1>${user.name}</h1> <p><strong> height:</strong> ${user.height} Meter</p> <br>`)
    }
}

function findDragon(user){
    if(user.type === "dragon"){
        return user
    }
}


pokemonRepository.getAll().forEach(loopFunction);

let dragons=pokemonRepository.getAll().filter(findDragon);

console.log(dragons)
