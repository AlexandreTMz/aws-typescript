import { APIGatewayEvent, Context, Callback } from 'aws-lambda';
import 'source-map-support/register';
import axios from 'axios'
import { Pelicula } from '../modelos/Pelicula';

export default async (_event: APIGatewayEvent, _context: Context, callback: Callback,): Promise<any> => {
    try {
        // Esperando respusta datos
        const resultados = await axios("https://swapi.py4e.com/api/films");
        // Recogiendo datos
        const datos = resultados.data.results

        // Mapeando datos
        let peliculas: Pelicula[] = []
        datos.map((e: any) => {
            peliculas.push(new Pelicula(e))
        })

        // Todo ok? enviamos la respuesta al usuario
        const response = {
            statusCode: 201,
            body: JSON.stringify(peliculas)
        };
        callback(null, response);
    } catch (error) {
        // error ? general!
        const response = {
            statusCode: 500,
            body: JSON.stringify({ "message": "Error general!." })
        };
        callback(null, response);
    }
};
