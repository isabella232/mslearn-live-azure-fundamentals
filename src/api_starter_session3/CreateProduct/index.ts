import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<any> {
    context.log("Creating new product");
    
    const productToCreate = req.body;
    
	// Return a 400 (bad request) if there are issues.
	if (productToCreate == null || productToCreate["id"] == null) {
		context.res = {
			status: 400,
			headers: { "Content-Type": "application/json" },
			body: "Product data must be present in request body and have the 'id' property set."
		}
		return;
	}

	// Return the product back to the caller.
	context.res = {
		status: 200,
		headers: { "Content-Type": "application/json" },
		body: { product: productToCreate }
	};
};

export default httpTrigger;
