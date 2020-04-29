import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { DataConnection } from "../helper/DataConnection";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    // SQL Example: SELECT * FROM c where c.itemType = "product" and ARRAY_CONTAINS(c.categories, "Books")
    const id = req.params.id;
    if (id == null)
    {
        context.res = {
            status: 400,
            body: "Please pass the category id into the URL"
        };
        return;
    }

    try
    {
        let data = new DataConnection();
        let container = data.GetContainer();

        var query: any = {
            query: "SELECT * FROM c where c.itemType = 'product' and ARRAY_CONTAINS(c.categories, @id)",
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
