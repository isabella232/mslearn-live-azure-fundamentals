import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { DataConnection } from "../helper/DataConnection";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    // Example Query: SELECT * FROM c where c.itemType = "product" 
    try
    {
        let data = new DataConnection();
        let container = data.GetContainer();

        var query: any = {
            query: "select * from product p where p.itemType = 'product'"
        };
        let iterator = container.items.query(query);
        let resources = await iterator.fetchAll();

        context.res = { body: resources };
    } catch (err)
    {
        context.res = {
            status: 500,
            body: err.message
          };
    }
};

export default httpTrigger;
