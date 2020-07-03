import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<any> {
    context.log("Creating new product");
    
    const productToCreate = req.body;
    
    // Return a 400 (bad request) if there are issues.
    if (productToCreate == null || productToCreate["id"] == null) {
        return {
            res: {
                status: 400,
                headers: { "Content-Type": "application/json" },
                body: "Product data must be present in request body and have the 'id' property set."
            }
        }
    }

    // Return the product back to the caller and also send to CosmosDB via the out binding.
    return {
        res: {
            status: 200,
            headers: { "Content-Type": "application/json" },
            body: { product: productToCreate }
        },
        outputProduct: productToCreate
    }
};

export default httpTrigger;
