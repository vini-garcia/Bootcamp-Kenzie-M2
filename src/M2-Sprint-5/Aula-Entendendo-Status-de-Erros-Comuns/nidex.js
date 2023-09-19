async function getInfo() {
    const divRoot = document.querySelector('.root');
  
    try {
      const response = await fetch(
        'https://api.github.com/users/matheusfelipetpsasasasa',
      );
      const responseJson = await response.json();
  
      if (response.status === 404) {
        divRoot.insertAdjacentHTML(
          'beforeend',
          `
              <div class="not-found">
                <h1>404 NOT FOUND</h1>
                <p>A página não foi encontrada :(</p>
              </div>
              `,
        );
      } else {
        divRoot.insertAdjacentHTML(
          'beforeend',
          `
              <div class="card">
                <h1>${responseJson.name}</h1>
                <img src="${responseJson.avatar_url} alt="Foto de perfil">
                <p>@${responseJson.login}</p>
                <p>${responseJson.location}</p>
                <a href="${responseJson.blog}" target="_blank">Rede social</a>
              </div>
              `,
        );
      }
    } catch {
      divRoot.insertAdjacentHTML(
        'beforeend',
        `
            <h1 class="message-error">Opssss, alguma coisa deu errado!</h1>
            `,
      );
    }
  }
  
  getInfo();