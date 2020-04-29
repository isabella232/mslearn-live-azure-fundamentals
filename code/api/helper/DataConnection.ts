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
        this.DatabaseName = process.env.cosmosDBName;
        this.ContainerName = process.env.cosmosDBContainer;
        
        const client = new CosmosClient(this.ConnectionString);
        const database = client.database(this.DatabaseName);
        const container = database.container(this.ContainerName);

        return container;
    }

    // The context for authenticated requests should contain a header value which can be used for autherntication
    async GetUserIdFromToken(context: import("@azure/functions").Context) {
        let tokenValue = context.req.headers["token"];

        let data = new DataConnection();
        let container = data.GetContainer();
    
        // See if the user already exists
        var query: any = {
            query: "select * from items i where i.itemType = 'user' and i.token = @token",
            parameters: [
                {
                    name: "@token",
                    value: tokenValue
                }
            ]
        };

        let iterator = container.items.query(query);
        let resources = await iterator.fetchAll();
        if (resources.resources.length == 0)
        {
            return null;
        } else {
            return resources.resources[0].username;
        }
    }
}