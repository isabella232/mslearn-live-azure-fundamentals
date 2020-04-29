import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { CosmosClient } from "@azure/cosmos";
import { DataConnection } from "../helper/DataConnection";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    // Example Query: SELECT * FROM c where c.itemType = "product" and c.id = "cap"
    const id = req.params.id;
    if (id == null)
    {
        context.res = {
            status: 400,
            body: "Please pass the id of the product on the url"
        };
        return;
    }

    try
    {
        let data = new DataConnection();
        let container = data.GetContainer();

        var query: any = {
            query: "select * from product p where p.itemType = 'product' and p.id = @id",
            parameters: [
                {
                    name: "@id",
                    value: id
                }
            ]
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
