import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<any> {
	
	const loadedProducts = [
		{
			id: "p001",
			name: "A product",
			description: "First product to be returned - yay!"
		},
		{
			id: "p002",
			name: "Another product",
			description: "Second product to be returned"
		},
		{
			id: "p003",
			name: "Third product",
			description: "Thrid product to be returned"
		}
	];
	
	context.res = {
		status: 200,
		headers: { "Content-Type": "application/json" },
		body: {
			product: loadedProducts
		}
	};
};

export default httpTrigger;
