import { CosmosClient } from "@azure/cosmos";

export class DataConnection
{
    public ConnectionString: string;
    public DatabaseName: string;
    public ContainerName: string;

    public DataConnection()
    {
    }

    public GetContainer() : any
    {
        this.ConnectionString = process.env.CONNECTION_STRING;
        this.DatabaseName = process.env.COSMOS_DB_NAME;
        this.ContainerName = process.env.COSMOS_DB_CONTAINER;
        
        const client = new CosmosClient(this.ConnectionString);
        const database = client.database(this.DatabaseName);
        const container = database.container(this.ContainerName);

        return container;
    }
}