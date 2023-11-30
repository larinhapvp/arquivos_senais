function buscarCep() {
  var cep = document.getElementById("cep").value;
  const apiUrl = 'https://viacep.com.br/ws/'+cep+'/json/';

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('verifique o nome da cidade e tente novamente');
      }
      const retorno = response.json();
      return retorno;

    })

    .then(data => {

      console.log(data.logradouro);

      //document.getElementById("saida").value = temp + ' °C'
    })
}
