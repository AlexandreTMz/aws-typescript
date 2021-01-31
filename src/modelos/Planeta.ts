export class Planeta {
    nombre: string
    peridoRotacion: string
    periodoOrbita: string
    diametro: string
    clima: string
    gavedad: string
    terreno: string
    superficieAgua: string
    poblacion: string
    residentes: string[]
    peliculas: string[]
    creado: string
    editado: string
    url: string

    constructor(data:any){
        this.nombre = data.name
        this.peridoRotacion = data.rotation_period
        this.periodoOrbita = data.orbital_period
        this.diametro = data.diameter
        this.clima = data.climate
        this.gavedad = data.gravity
        this.terreno = data.terrain
        this.superficieAgua = data.surface_water
        this.poblacion = data.population
        this.residentes = data.residents
        this.peliculas = data.films
        this.creado = data.created
        this.editado = data.edited
        this.url = data.url
    }
}