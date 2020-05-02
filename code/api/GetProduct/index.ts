import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { CosmosClient } from "@azure/cosmos";
import { DataConnection } from "../helper/DataConnection";
import { stringify } from "querystring";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<any> {
    // The ID of the product to be read is part of the URL and can be accessed as "productId"
    // because that is the placeholder used in function.json.
    const productId = req.params.productId;

    context.log(`Getting product info for ID '${productId}'`);

    // The product is read from the DB using an input binding.
    // The name "inputProduct" is defined in function.json.
    const loadedProduct = context.bindings.inputProduct;

    if (loadedProduct == null) {
        return {
            res: {
                status: 404,
                headers: { "Content-Type": "application/json" },
                body: `Unable to load product with ID ${productId}`
            }
        }
    }
    
   return {
        res: {
            status: 200,
            headers: { "Content-Type": "application/json" },
            body: { product: loadedProduct }
        }
    }
};

export default httpTrigger;
