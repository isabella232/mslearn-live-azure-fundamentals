"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cosmos_1 = require("@azure/cosmos");
class DataConnection {
    DataConnection() {
    }
    GetContainer() {
        this.ConnectionString = process.env.CONNECTION_STRING;
        this.DatabaseName = process.env.cosmosDBName;
        this.ContainerName = process.env.cosmosDBContainer;
        const client = new cosmos_1.CosmosClient(this.ConnectionString);
        const database = client.database(this.DatabaseName);
        const container = database.container(this.ContainerName);
        return container;
    }
    // The context for authenticated requests should contain a header value which can be used for autherntication
    GetUserIdFromToken(context) {
        return __awaiter(this, void 0, void 0, function* () {
            let tokenValue = context.req.headers["token"];
            let data = new DataConnection();
            let container = data.GetContainer();
            // See if the user already exists
            var query = {
                query: "select * from items i where i.itemType = 'user' and i.token = @token",
                parameters: [
                    {
                        name: "@token",
                        value: tokenValue
                    }
                ]
            };
            let iterator = container.items.query(query);
            let resources = yield iterator.fetchAll();
            if (resources.resources.length == 0) {
                return null;
            }
            else {
                return resources.resources[0].username;
            }
        });
    }
}
exports.DataConnection = DataConnection;
//# sourceMappingURL=DataConnection.js.map