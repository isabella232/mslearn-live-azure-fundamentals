import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { DataConnection } from "../helper/DataConnection";
import { createHash } from "crypto";
import { PasswordHashHelper } from "../helper/PasswordHashHelper";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const info = req.body;

    // See if the user details are correct
    if (info.UserName == null || info.UserName.length < 3)
    {
        context.res = {
            status: 400,
            body: "The username must be supplied and be at least 6 characters"
        };
        return;
    }
    if (info.Password == null || info.Password.length < 8)
    {
        context.res = {
            status: 400,
            body: "The user password must be supplied and be at least 8 characters"
        };
        return;
    }

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
    if (resources.resources.length > 0)
    {
        // The user already exists and we need to return an error
        context.res = {
            status: 400,
            body: "The user cannot be registered as a user with that name already exists"
        };
        return;
    }

    // Create a token and appropriate hash    
    let passwordHash = hash.MakeHash(info.Password);    
    let generatedToken = hash.MakeToken(info.UserName + "_", "_token", 4);

    // Create an user item in the database with an appropriate token
    var userToStore = {
        "id": storedId,
        "itemType": "user",
        "username": info.UserName,
        "hash": passwordHash,
        "token": generatedToken
    };
    let { resource } = await container.items.create(userToStore);

    // return the Login Details back from the user account for the app
    var returnedLoginDetails = {
        "username": userToStore.username,
        "token": userToStore.token
    };
    
    context.res = {
        body: returnedLoginDetails
    };
};

export default httpTrigger;
