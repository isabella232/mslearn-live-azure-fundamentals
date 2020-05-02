import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<any> {
    // CosmosDB bindings also support an array of data, not just single objects.
    const loadedProducts = context.bindings.inputProducts;

    // Return a 404 if the requested product wasn't found.
    if (loadedProducts == null) {
        return {
            res: {
                status: 404,
                headers: { "Content-Type": "application/json" },
                body: `Unable to load product list`
            }
        }
    }

    // Return the products.
    // Note how the product is part of the response: "res" is the name of the HTTP binding
    return {
        res: {
            status: 200,
            headers: { "Content-Type": "application/json" },
            body: { products: loadedProducts }
        }
    }
};

export default httpTrigger;
