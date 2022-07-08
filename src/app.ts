// Um desenvolvedor tentou criar um projeto que consome a base de dados de filme do TMDB para criar um organizador de filmes, mas desistiu 
// pois considerou o seu código inviável. Você consegue usar typescript para organizar esse código e a partir daí aprimorar o que foi feito?

// A ideia dessa atividade é criar um aplicativo que: 
//    - Busca filmes
//    - Apresenta uma lista com os resultados pesquisados
//    - Permite a criação de listas de filmes e a posterior adição de filmes nela

// Todas as requisições necessárias para as atividades acima já estão prontas, mas a implementação delas ficou pela metade (não vou dar tudo de graça).
// Atenção para o listener do botão login-button que devolve o sessionID do usuário
// É necessário fazer um cadastro no https://www.themoviedb.org/ e seguir a documentação do site para entender como gera uma API key 
// https://developers.themoviedb.org/3/getting-started/introduction

// Um desenvolvedor tentou criar um projeto que consome a base de dados de filme do TMDB para criar um organizador de filmes, mas desistiu 
// pois considerou o seu código inviável. Você consegue usar typescript para organizar esse código e a partir daí aprimorar o que foi feito?

// A ideia dessa atividade é criar um aplicativo que: 
//    - Busca filmes
//    - Apresenta uma lista com os resultados pesquisados
//    - Permite a criação de listas de filmes e a posterior adição de filmes nela

// Todas as requisições necessárias para as atividades acima já estão prontas, mas a implementação delas ficou pela metade (não vou dar tudo de graça).
// Atenção para o listener do botão login-button que devolve o sessionID do usuário
// É necessário fazer um cadastro no https://www.themoviedb.org/ e seguir a documentação do site para entender como gera uma API key https://developers.themoviedb.org/3/getting-started/introduction

// let apiKey: string = '3cf10e0bb2ae1e432edc5a97efa23713';
let apiKey: string = '';
let requestToken: string;
let username: string;
let password: string;
let sessionId: string;
let listId: string;
let listname: string;
let userId: string;


let loginButton = document.getElementById('login-button') as HTMLInputElement
let ocultarLogin = function(){
    let ocultaLogin = document.getElementById('areaLogin') as HTMLInputElement
    ocultaLogin.className = ('hidden')
}

function preencherLogin() {
    let user = document.getElementById('login') as HTMLInputElement
    username = String(user.value)
    validateLoginButton();
}

function preencherSenha() {
    let senha = document.getElementById('senha') as HTMLInputElement
    password = String(senha.value)
    validateLoginButton();
}

function preencherApi() {
    let chave = document.getElementById('api-key') as HTMLInputElement
    apiKey = String(chave.value)
    validateLoginButton();
}

function validateLoginButton() {
    if (password && username && apiKey) {
        loginButton.disabled = false;
    } else {
        loginButton.disabled = true;
    }
}

loginButton.addEventListener('click', async () => {
    await criarRequestToken();
    await logar();
    await criarSessao();
    await coletarIdUser();

    
})

async function criarRequestToken() {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
        method: "GET"
    }) as Token
    console.log(result)
    requestToken = result.request_token
}

async function logar() {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
        method: "POST",
        body: {
            username: `${username}`,
            password: `${password}`,
            request_token: `${requestToken}`
        }  
    })
    // console.log(result)
}

async function criarSessao() {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
        method: "GET"
    }) as Sessao
    if(result.success){
        console.log(result)
        sessionId = result.session_id;
        window.alert('Sessão iniciada com sucesso')
        ocultarLogin()
    }
    
}


























