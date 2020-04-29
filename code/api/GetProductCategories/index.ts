import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { DataConnection } from "../helper/DataConnection";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try
    {
        let data = new DataConnection();
        let container = data.GetContainer();

        var query: any = {
            query: "select * from collection c where c.id = '__categories'"
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
