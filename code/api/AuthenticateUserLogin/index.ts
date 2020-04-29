import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { DataConnection } from "../helper/DataConnection";
import { createHash } from "crypto";
import { PasswordHashHelper } from "../helper/PasswordHashHelper";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const info = req.body;

    // Look for the user account matching the username
    let data = new DataConnection();
    let container = data.GetContainer();

    let hash = new PasswordHashHelper();
    let storedId = hash.GetStoredUserName(info.UserName);

    // See if the user already exists
    var query: any = {
        query: "select * from items i where i.itemType = 'user' and i.id = @id",
        parameters: [
            {
                name: "@id",
                value: storedId
            }
        ]
    };
    let iterator = container.items.query(query);
    let resources = await iterator.fetchAll();
    if (resources.resources.length == 0)
    {
        // The user already exists and we need to return an error
        context.res = {
            status: 401,
            body: "The user/password details do not exist or match"
        };
        return;
    }

    // Return the token if the user matches
    let passwordHash = hash.MakeHash(info.Password);
    var user = resources.resources[0];
    if (user.hash != passwordHash)
    {
        // The user already exists and we need to return an error
        context.res = {
            status: 401,
            body: "The user/password details do not exist or match"
        };
        return;
    }

    let loginResult = 
    {
        "username": user.username,
        "token": user.token
    };

    context.res = {
        body: loginResult
    };
};

export default httpTrigger;
