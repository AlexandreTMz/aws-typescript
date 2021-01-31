import { APIGatewayEvent, Context, Callback } from 'aws-lambda';
import 'source-map-support/register';
import { DynamoDB } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid'
const dynamoDb = new DynamoDB.DocumentClient();

export default async (event: APIGatewayEvent, _context: Context, callback: Callback,): Promise<any> => {
    try {
        // Recogiendo datos
        const data = JSON.parse(event.body);

        // Validando datos
        if (typeof data.modelo !== 'string' || typeof data.nombre !== 'string') {
            return {
                statusCode: 400,
                body: JSON.stringify({ "message": "Complete los datos por favor!." })
            }
        }

        // GENERANDO DATOS Y ASIGNADO
        const datetime = new Date().toISOString();
        const id = uuidv4();

        // Esperando la promesa...
        await dynamoDb.put({
            TableName: 'hardware',
            Item: {
                idHardware: id,
                nombre: data.nombre,
                modelo: data.modelo,
                descripcion: data.descripcion,
                createdAt: datetime,
                updatedAt: datetime
            },
        }).promise();

        // Todo ok? enviamos la respuesta al usuario
        let response = {
            statusCode: 200,
            body: JSON.stringify({ ...data, id }),
        };
        callback(null, response)
    } catch (error) {
        // error ? general!
        const response = {
            statusCode: 500,
            body: JSON.stringify({ "message": "Error general!." })
        };
        callback(null, response);
    }
};
