//Desenvolva sua lógica aqui utlizando o método de array filter e verifique o resultado no console do seu navegador.

//1) Crie uma função para filtrar os hotéis que estão localizados no Brasil
function filterCountry(array) {
  const inBrazil = array.filter((hotel)=> hotel.country == 'Brasil')
  return inBrazil;
}
console.log(filterCountry(data));

// 2) Crie uma função para filtrar os hotéis que possuem o preço igual ou maior que R$200,00.
function filterPrice(array) {
  const priceabouve200 = array.filter((parametro)=> parametro.price >= 200)
  return priceabouve200;
}
console.log(filterPrice(data));

//3) Crie uma função para filtrar os hotéis que estão abertos nesse momento (isOpen)
function filterIsOpen(array) {
  const openNow = array.filter((element)=> element.isOpen)
  return openNow;
}
console.log(filterIsOpen(data));

//DESAFIO
//4) Crie uma função que filtre apenas o hotel com o nome “Copacabana Palace”. Após isso, crie outra função para verificar as datas disponíveis para agendamento nesse hotel (isAvaliable).
function filterHotelName(array) {
  const rioDeJaneiro = array.filter((element)=> element.name == 'Copacabana Palace')
  return rioDeJaneiro;
}

function filterToBook() {
  const hotel = filterHotelName(data);
  const calender = hotel[0].toBook.filter((element)=>{
    return element.isAvailable
  })
  return calender;
}
console.log(filterToBook());