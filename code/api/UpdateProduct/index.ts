import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { DataConnection } from "../helper/DataConnection";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
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

        const productToUpdate = req.body;
        
        let { resource } = await container.item(id, id).replace(productToUpdate);

        context.res = {
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
