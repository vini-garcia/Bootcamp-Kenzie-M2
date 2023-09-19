function procuraSobremesa(valorDoInput) {
    /* Desenvolva sua lógica a partir aqui */
    valorDoInput = valorDoInput.toLowerCase();
    let resultado = [];

    listaDeSobremesas.filter((sobremesa)=>
    sobremesa.nome.toLowerCase().includes(valorDoInput) ? resultado.push(sobremesa) : '')
    
    return resultado /* É necessário retornar uma lista de produtos */
}



// function procuraSobremesa(valorDoInput) {
//     /* Desenvolva sua lógica a partir aqui */
//     valorDoInput = valorDoInput.toLowerCase();
//     let resultado = [];

//     for (let i = 0; i < listaDeSobremesas.length; i++) {
//         let sobremesa = listaDeSobremesas[i];
    
//         if (sobremesa.nome.toLowerCase().includes(valorDoInput)) {
//           resultado.push(sobremesa);
//         }
//     }
     
//     return resultado /* É necessário retornar uma lista de produtos */
// }