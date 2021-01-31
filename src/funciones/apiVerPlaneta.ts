import { APIGatewayEvent, Context, Callback } from 'aws-lambda';
import 'source-map-support/register';
import axios from 'axios'
import { Planeta } from '../modelos/Planeta'

export default async (event: APIGatewayEvent, _context: Context, callback: Callback,): Promise<any> => {
    try {
        // Parametro de la url
        const { id } = event.pathParameters
        // Esperando respusta datos
        const resultados = await axios(`https://swapi.py4e.com/api/planets/${id}`);
        // Recogiendo datos y mapeando
        const datos = await new Planeta(resultados.data)

        // Todo ok? enviamos la respuesta al usuario
        const response = {
            statusCode: 201,
            body: JSON.stringify(datos)
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
