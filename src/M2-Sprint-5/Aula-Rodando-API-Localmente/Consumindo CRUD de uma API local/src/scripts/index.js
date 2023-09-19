async function registraUsuario() {
    const data = {
        username: "Kenzinho",
        email: "kenzin@mail.com",
        password: "123456"
    } // Criamos os dados para o registro em um objeto
    
    const options = {
        method: 'POST', // Indicamos o método
        headers: {
            'Content-Type': 'application/json', // Definimos o formato do body que enviaremos
        },
        body: JSON.stringify(data) // Passamos os dados para JSON e colocamos no body para enviarmos
    }
    
    const responseJSON = await fetch('http://localhost:3333/register', options)
    const response = await responseJSON.json()
  
    console.log(response)
  }
  registraUsuario()




  async function pegaFilmes() {
    const responseJSON = await fetch('http://localhost:3333/movies') // Por padrão, o fetch executa o GET na URL
    const response = await responseJSON.json()
  
    console.log(response)
  }
  pegaFilmes()




  async function atualizaFilme() {
    const data = {
        category: "Aventura"
    } // Indicamos o dado a ser atualizado e seu novo valor
    
    const options = {
        method: 'PATCH', // Indicamos o método
        headers: {
            'Content-Type': 'application/json', // Definimos o formato do body que enviaremos
        },
        body: JSON.stringify(data) // Passamos os dados para JSON e colocamos no body para enviarmos
    }
    
    const responseJSON = await fetch('http://localhost:3333/movies/138dcf92-8bca-4b58-86ea-00840f1a67a6', options) // passamos o id do filme no final da URL
    const response = await responseJSON.json()
  
    console.log(response)
  }
  atualizaFilme()
  
  


  async function deletaFilme() {    
    const options = {
        method: 'DELETE' // Indicamos o método
    }
    
    await fetch('http://localhost:3333/movies/138dcf92-8bca-4b58-86ea-00840f1a67a6', options) // passamos o id do filme no final da URL
  }
  deletaFilme()