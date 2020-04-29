import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { DataConnection } from "../helper/DataConnection";
import { Guid } from "guid-typescript";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try
    {
        let data = new DataConnection();
        let userid = await data.GetUserIdFromToken(context);

        const orderToCreate = req.body;
        orderToCreate.itemType = "order";  
        orderToCreate.id = Guid.create().toString();
        orderToCreate.userAccount = userid;
        orderToCreate.status = "Submitted";
        orderToCreate.dateSubmitted = Date.now().toString();
        
        // Check that the amount >= $0
        if (orderToCreate.TotalPrice < 0)
        {
            context.res = {
                status: 500,
                body: "The order amount is incorrect. Negative orders are not allowed"
            };
            return;
        }

        // We're all good, let the data through
        let container = data.GetContainer();

        let { resource } = await container.items.create(orderToCreate);

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
