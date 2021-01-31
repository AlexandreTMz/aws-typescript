import { APIGatewayEvent, Context, Callback } from 'aws-lambda';
import 'source-map-support/register';
import { DynamoDB } from 'aws-sdk';

const dynamo = new DynamoDB.DocumentClient();

export default async (event: APIGatewayEvent, _context: Context, callback: Callback,): Promise<any> => {

    try {
        // Recogiendo datos
        const data = JSON.parse(event.body);
        // Validando datos
        if (typeof data.modelo !== 'string' || typeof data.nombre !== 'string' || typeof data.descripcion !== 'string') {
            return {
                statusCode: 400,
                body: JSON.stringify({ "message": "Complete los datos por favor!." })
            }
        }
        // Hardware
        const { id } = event.pathParameters
        // Fecha
        const datetime = new Date().toISOString();

        // Parametros
        const params = {
            TableName: 'hardware',
            ConditionExpression: 'attribute_exists(idHardware)',
            Key: {
                idHardware: id
            },
            ExpressionAttributeValues: {
                ':tNombre': data.nombre,
                ':tDescripcion': data.descripcion,
                ':tModelo': data.modelo,
                ':tUpdatedAt': datetime
            },
            UpdateExpression: 'set nombre = :tNombre, descripcion = :tDescripcion, modelo = :tModelo, updatedAt = :tUpdatedAt'
        };

        // Esperando la promesa...
        await dynamo.update(params).promise();

        // Todo ok? enviamos la respuesta al usuario
        const response = {
            statusCode: 200,
            body: JSON.stringify({ "message": "Hardware actualizado exitosamente!." })
        };
        callback(null, response);

    } catch (err) {
        if (err.code === 'ConditionalCheckFailedException') {
            // error ? id no encontrado! 
            const response = {
                statusCode: 404,
                body: JSON.stringify({ "message": "No se ha encontrado este hardware!." })
            };
            callback(null, response);
        }
        // error ? general!
        const response = {
            statusCode: 500,
            body: JSON.stringify({ "message": "Error general!." })
        };
        callback(null, response);
    }
};