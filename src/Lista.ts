
let searchContainer = document.getElementById('search-container') as HTMLInputElement;
let busListaBtn = document.getElementById('buscaLista') as HTMLInputElement;
let criaLista = document.getElementById('criaLista') as HTMLInputElement;

const  minhasListas = new Map();


criaLista.addEventListener('click', async () => {
    let lista = document.getElementById('idLista') as HTMLInputElement
    if (lista) {
        criarLista(lista.value, '')
    }
})

async function criarLista(nomeDaLista: string, descricao: string) {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/list?api_key=${apiKey}&session_id=${sessionId}`,
        method: "POST",
        body: {
            name: nomeDaLista,
            description: descricao,
            language: "pt-br"
        }
    }) as CriaLista
    if (result.status_code == 1) {
        window.alert(`Criada nova lista ${nomeDaLista} com id ${result.list_id}`)
        console.log(result.list_id)
    }
}

busListaBtn.addEventListener('click', async () => {
    preencherNomeLista()
})

async function preencherNomeLista() {
    let nomeLista = document.getElementById('idLista') as HTMLInputElement
    listname = String(nomeLista.value)
    console.log(listname)
    await verificaListExist(listname);
    await pegarLista();
}

async function coletarIdUser() {
    let result: User = await HttpClient.get({
        url: `https://api.themoviedb.org/3/account?api_key=${apiKey}&session_id=${sessionId}`, 
        method: "GET"
    }) as User
    console.log(result.id)
    userId = String(result.id); 
}

async function colecaoDeListas() {
    let result: MinhasListas = await HttpClient.get({
        url: `https://api.themoviedb.org/3/account/${userId}/lists?api_key=${apiKey}&language=pt-br&session_id=${sessionId}&page=1`, 
        method: "GET"
    }) as MinhasListas;

    for (const item in result.results) {
        console.log(result.results[item].id)
        console.log(result.results[item].name)
        minhasListas.set(result.results[item].name, result.results[item].id)
    }
    console.log(minhasListas)
}


async function verificaListExist(list: String) {
    await colecaoDeListas();
    listId = ""
    console.log('Coletando o ID da lista na map Para eviar Get para API')
    if (minhasListas.get(list)){
        return listId = minhasListas.get(list)
    }
    console.log(listId)
    window.alert(`Lista: ${list} não encontrda! \b\r Favor clicar em \"Criar lista\" para ADD `)
}


async function pegarLista() {
    let result: Lista = await HttpClient.get({
        url: `https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}`,
        method: "GET"
    }) as Lista
    let quadroFilmes = document.getElementById("filmes") as HTMLInputElement
    quadroFilmes.innerHTML = ''
    let ul = document.createElement('ul')
    for (const item of result.items) {
        criarPost(ul, item)
    }
    quadroFilmes.appendChild(ul)
}

async function adicionarFilmeNaLista(filmeId: string, listaId: string) {
    
    await verificaListExist(listaId);

    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/list/${listId}/add_item?api_key=${apiKey}&session_id=${sessionId}`,
        method: "POST",
        body: {
            media_id: filmeId
        }
    }) as ResultAddLista
    if (result.success) {
        console.log(result);
        window.alert(`Item adicionado a lista ${listaId}`)
    }

}

