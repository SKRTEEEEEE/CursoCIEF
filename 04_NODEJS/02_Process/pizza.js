const pizzas = require("./data");


if(process.argv.length < 3){
let menu = `
Node's Pizza
=============`

for (let i = 0; i < pizzas.length; i++) {
    menu += `\n${i + 1} - ${pizzas[i].nombre} : ${pizzas[i].precio.toFixed(2)}€`
}
console.log(menu);
console.log("¿Cuál prefieres?");
} else {
    const selectedPizzaIndex = parseInt(process.argv[2]);

    if (selectedPizzaIndex > 0 && selectedPizzaIndex < 5) {
        const selectedPizza = pizzas[selectedPizzaIndex - 1];

        console.log(`
    Has elegido pizza: ${selectedPizza.nombre}
    El importe es: ${selectedPizza.precio.toFixed(2)}€`);
    } else {
        console.log("No hay esa pizza disponible.");
    }
}



