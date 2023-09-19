function removeDoCarrinho(produto) {
    /* desenvolva sua lógica aqui */

    const item = (element) => element == produto

    const indice = listaDoCarrinho.findIndex(item)

    let novaLista = listaDoCarrinho.splice(indice, 1)




    return novaLista /* Lembre-se de retornar o produto removido aqui */
}