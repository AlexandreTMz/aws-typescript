export class Pelicula {
    titulo: string
    episodioId: string
    aperturaInicio: string
    director: string
    productor: string
    fechaLanzamiento: string
    personajes: string[]
    planetas: string[]
    navesStalares: string[]
    vehiculos: string[]
    especies: string[]
    creado: string
    editado: string
    url: string

    constructor(data: any) {
        this.titulo = data.title
        this.episodioId = data.episode_id
        this.aperturaInicio = data.opening_crawl
        this.director = data.director
        this.productor = data.producer
        this.fechaLanzamiento = data.release_date
        this.personajes = data.characters
        this.planetas = data.planets
        this.navesStalares = data.starships
        this.vehiculos = data.vehicles
        this.especies = data.species
        this.creado = data.created
        this.editado = data.edited
        this.url = data.url
    }
}