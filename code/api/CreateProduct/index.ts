import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { DataConnection } from "../helper/DataConnection";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try
    {
        let data = new DataConnection();
        let userid = await data.GetUserIdFromToken(context);

        if (userid == null)
        {
            context.res = {
                status: 401,
                body: "There is no user authenticated to create a product"
            };
            return;
        }

        let container = data.GetContainer();

        const productToCreate = req.body;
        
        let { resource } = await container.items.create(productToCreate);

        context.res = {
        // status: 200, /* Defaults to 200 */
        body: resource
        };
    } catch (err)
    {
        context.res = {
            status: 500,
            body: err.message
          };
    }
};

export default httpTrigger;
