import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<any> {
    // The ID of the product to be read is part of the URL and can be accessed as "productId"
    // because that is the placeholder used in function.json.
    const productId = req.params.productId;

    context.log(`Getting product info for ID '${productId}'`);

    const loadedProduct = {
		id: productId,
		name: "A product",
		description: "First product to be returned - yay!"
	};
	
	context.res = {
		status: 200,
		headers: { "Content-Type": "application/json" },
		body: {
			product: loadedProduct
		}
	};
};

export default httpTrigger;
