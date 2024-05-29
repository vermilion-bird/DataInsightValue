import Request from '@/lib/requests'; // Ensure this is the correct path to your Request class

// Define the interface for the POST request data
export interface IConnectionData {
    id?:string;
    connectionName: string;
    hostURL: string;
    port: number;
    database: string;
    username: string;
    schema: string;
    password: string;
}


export default class ConnectionsApi {
    static async create(connectionData: IConnectionData): Promise<IConnectionData> {
        try {
            const response = await Request.postJson("connections/", connectionData);
            // Assuming the server responds with JSON containing the created connection data
            return response;
        } catch (error) {
            // Here you could handle errors or rethrow them to be handled by the calling function
            throw error;
        }
    }
    static async list(skip: number = 0, limit: number = 100): Promise<IConnectionData[]> {
        try {
            const response = await Request.getJson(`connections/?skip=${skip}&limit=${limit}`);
            // Assuming the server responds with JSON containing an array of connection data
            return response;
        } catch (error) {
            // Here you could handle errors or rethrow them to be handled by the calling function
            throw error;
        }
    }
    static async update(connectionId: string, connectionData: IConnectionData): Promise<IConnectionData> {
        try {
            const response = await Request.putJson(`connections/${connectionId}`, connectionData);
            // Assuming the server responds with JSON containing the updated connection data
            return response;
        } catch (error) {
            // Here you could handle errors or rethrow them to be handled by the calling function
            throw error;
        }
    }
    static async delete(connectionId: string): Promise<void> {
        try {
            await Request.delete(`connections/${connectionId}`);
            // The delete operation might not return any content, hence no need to return a response
        } catch (error) {
            // Handle errors or rethrow them to be handled by the calling function
            throw error;
        }
    }
}
