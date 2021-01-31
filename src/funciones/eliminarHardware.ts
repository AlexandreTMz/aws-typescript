import {  APIGatewayEvent, Context, Callback } from 'aws-lambda';
import 'source-map-support/register';
import {  DynamoDB } from 'aws-sdk';

const dynamo = new DynamoDB.DocumentClient();

export default async (event: APIGatewayEvent, _context: Context, callback: Callback,): Promise<any> => {

    try {
        // Recogiendo datos
        const { id } = event.pathParameters
        // Parametros
        const params = {
            TableName: 'hardware',
            ConditionExpression: 'attribute_exists(idHardware)',
            Key: {
                idHardware: id
            }
        };
        // Esperando la promesa...
        await dynamo.delete(params).promise();

        // Todo ok? enviamos la respuesta al usuario
        const response = {
            statusCode: 200,
            body: JSON.stringify({ "message": "Hardware elimiado exitosamente!." })
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