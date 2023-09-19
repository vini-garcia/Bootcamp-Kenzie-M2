function newMap(array, callback) {
  let output = [];
  for(let i = 0; i<array.length; i++){
    let elemento = array[i];
    output.push(callback(elemento));
  }
  return output;
}

function newFilter(array, callback) {
  let output = [];
  for(let i = 0; i<array.length; i++){
    let elemento = array[i];
    if(callback(elemento) == true){
      output.push(elemento);
    }
  }
  return output;
}

function newFind(array, callback) {
  for(let i = 0; i<array.length; i++){
    let elemento = array[i];
    if(callback(elemento) == true){
      return elemento;
    }
  }
}

function newReduce(array, callback, initialValue = 0) {
  let accumulator = initialValue;
  for(let i = 0; i < array.length; i++){
    let currentValue = array[i];
    accumulator = callback(accumulator, currentValue);
  }
  return accumulator;
}






// Não alterar o código abaixo

export {
  newMap,
  newFilter,
  newFind,
  newReduce
}