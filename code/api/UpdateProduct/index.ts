import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<any> {
    // The ID of the product to be updated is part of the URL and can be accessed as "productId"
    // because that is the placeholder used in function.json.
    const productId = req.params.productId;

    context.log(`Updating product info for ID '${productId}'`);
    
    const productToUpdate = req.body;
    
    // Return a 400 (bad request) if there are issues.
    if (productToUpdate == null || productToUpdate["id"] != productId) {
        return {
            res: {
                status: 400,
                headers: { "Content-Type": "application/json" },
                body: productToUpdate == null ? "No product data found in request body." : `The product ID '${productToUpdate["id"]}' provided in the request body does not match the product ID of '${productId}' in the URL route.`
            }
        }
    }

    // Return the product back to the caller and also send to CosmosDB via the out binding.
    return {
        res: {
            status: 200,
            headers: { "Content-Type": "application/json" },
            body: { product: productToUpdate }
        },
        outputProduct: productToUpdate
    }
};

export default httpTrigger;
