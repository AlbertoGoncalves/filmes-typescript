interface ResultadoBusca {
    page: number,
    results: Array<Filme>,
    totalPages: number,
    totalResults: number
}
interface Filme {
    adult: boolean,
    genre_ids: Array<Number>,
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    title: string,
    poster_path: string,
    release_date: string
}
interface Lista {
    created_by: string,
    description: string,
    favorite_count: number,
    id: string,
    name: String,
    items: Array<Filme>
}
interface ResultAddLista {
    success: boolean,
    status_code: number,
    status_message: string
}
interface CriaLista {
    status_code: number,
    status_message: string,
    success: boolean,
    list_id: number
}

interface Sessao {
    success: boolean,
    session_id: string
}
interface Token{
    success: boolean,
    expires_at: string,
    request_token:string
}

interface MinhasListas{
    page: 1, 
    results: Array<Lista>, 
    total_pages: 1, 
    total_results: 5
}

interface User{
    // avatar: String,
    id: String,
    name: String,
    username: String;
}
