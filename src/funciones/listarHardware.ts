import { APIGatewayEvent, Context, Callback } from 'aws-lambda';
import 'source-map-support/register';
import { DynamoDB } from 'aws-sdk';

const dynamo = new DynamoDB.DocumentClient();

export default async (_event: APIGatewayEvent, _context: Context, callback: Callback,): Promise<any> => {
    try {
        // Parametros
        const params = {
            TableName: 'hardware'
        };
        // Esperando la promesa...
        const data = await dynamo.scan(params).promise();
        // Todo ok? enviamos la respuesta al usuario
        let response = {
            statusCode: 200,
            body: JSON.stringify(data.Items),
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