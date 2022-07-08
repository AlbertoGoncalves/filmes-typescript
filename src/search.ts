let searchButton = document.getElementById('search-button') as HTMLInputElement

searchButton.addEventListener('click', async () => {
    let lista = document.getElementById("lista");
    if (lista) {
        lista.outerHTML = "";
    }
    let queryTemp = document.getElementById('search') as HTMLInputElement
    let query: string = String(queryTemp.value)
    //let query = document.getElementById('search').value;
    let listaDeFilmes: ResultadoBusca = await procurarFilme(query) as ResultadoBusca
    let quadroFilmes = document.getElementById("filmes") as HTMLInputElement
    quadroFilmes.innerHTML = ''
    let ul = document.createElement('ul')
    //console.log(listaDeFilmes)
    for (const item of listaDeFilmes.results) {
        criarPost(ul, item)
        quadroFilmes.appendChild(ul)
        listenerBtn(String(item.id))
    }
})

async function procurarFilme(query: string) {
    query = encodeURI(query)
    console.log(query)
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
        method: "GET"
    })
    return result
}

async function adicionarFilme(filmeId: number) {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${apiKey}&language=en-US`,
        method: "GET"
    })
    console.log(result);
}


function criarPost(elem: Node, item: Filme) {
    let quadroPoster = document.createElement('div')
    let quadroTitulo = document.createElement('div')
    let btnAdd = document.createElement('button')
    btnAdd.id = String(item.id)
    btnAdd.innerHTML = ('ADD A LISTA')
    quadroPoster.classList.add('poster')
    quadroTitulo.classList.add('titulo')
    let li = document.createElement('li')
    let img = document.createElement('img')
    img.src = "https://image.tmdb.org/t/p/w500/" + item.poster_path
    let tagTitle = document.createElement('span')
    tagTitle.innerText = item.original_title + ": "
    let tagResumo = document.createElement('p')
    tagResumo.innerText = item.overview
    quadroTitulo.appendChild(tagTitle)
    quadroTitulo.appendChild(tagResumo)
    quadroTitulo.appendChild(btnAdd)
    quadroPoster.appendChild(img)
    li.appendChild(quadroTitulo)
    li.appendChild(quadroPoster)
    elem.appendChild(li)

}
function listenerBtn(id: string) {
    console.log(id)
    const btn = document.getElementById(id) as HTMLInputElement
    btn.addEventListener('click', () => {
        let lista = document.getElementById('idLista') as HTMLInputElement
        if (lista) {
            adicionarFilmeNaLista(id, lista.value)
        }
    })
}