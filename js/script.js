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


for(let i= 0; i < pokemonList.length ; i++){
  
    if(pokemonList[i].height > 1){
        document.write(`${pokemonList[i].name}  (height: ${pokemonList[i].height})-Wow!! is bigger the one meter! <br>`)
    }
    else { document.write(`${pokemonList[i].name}  (height:${pokemonList[i].height}) <br>`)
    }


}







