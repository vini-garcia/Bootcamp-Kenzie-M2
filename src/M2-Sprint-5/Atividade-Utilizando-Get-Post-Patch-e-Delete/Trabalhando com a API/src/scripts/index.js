const baseURL = 'http://localhost:3333';

const header = {
    'Content-Type': 'application/json'
  };

  const getAllProducts = async () => {
    const products = await fetch(`${baseURL}/products`, {
        method: 'GET',
        headers: header
    }).then(response => response.json())

    console.log(products)
    return products
  }
  // getAllProducts()


  const creatProduct = async (productBody) => {
    const newProdutc = await fetch(`${baseURL}/products`, {
      method: 'POST',
      headers: header,
      body: JSON.stringify(productBody),
    }).then((res) => {
      if(res.ok){
        console.log('Tudo certo')
        return res.json()
      }else{
        res.json().then((responseError) => {
          console.log(responseError.message)
        })
      }
    })
    return newProdutc
  }

  // creatProduct({
  //   "nome_do_produto": "Cadeira de tomar cerveja",
  //   "descricao_do_produto": "Cadeira de buteco Skol",
  //   "preco": 110.90,
  //   "quantidade_em_estoque": 10,
  //   "imagem": "https://images.tcdn.com.br/img/img_prod/740836/cadeira_gamer_concordia_gm3_rgb_com_controle_e_powerbank_10803_1_20a776245ed6e9b1bd655072771901e6.png"
  // })



  const updateProduct = async (productBody, productId) =>{
    const updated = await fetch(`${baseURL}/products/${productId}`,{
      method: 'PATCH',
      headers: header,
      body: JSON.stringify(productBody),
    }).then((res) =>{
      if(res.ok){
        console.log('Deu boa')
        return res.json()
      }else{
        res.json().then((responseError) => {
          console.log(responseError.message)
        })
      }
    })
    return updated
  }

  // updateProduct({
  //   "nome_do_produto": "Headset25",
  //   "descricao_do_produto": "Headset gamer para conversar com seus amigos durante suas reuniões",
  //   "preco": 19.99,
  //   "quantidade_em_estoque": 300,
  //   "imagem": "sa"
  // }, '08fe59e7-1ce5-44a5-9438-7f9869eef848')



  const deleteProduct = async (productId) => {
    const deleted = await fetch(`${baseURL}/products/${productId}`, {
      method: 'DELETE',
      headers: header

    }).then(res => {
      if(res.ok){
        console.log('Deu boa')
      }else{
        res.json().then(responseError => {
          console.log(responseError.message)
        })
      }
    })
    return deleted
  }
// deleteProduct('08fe59e7-1ce5-44a5-9438-7f9869eef848')
