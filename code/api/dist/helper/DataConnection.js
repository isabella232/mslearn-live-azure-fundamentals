"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cosmos_1 = require("@azure/cosmos");
class DataConnection {
    DataConnection() {
    }
    GetContainer() {
        this.ConnectionString = process.env.CONNECTION_STRING;
        this.DatabaseName = process.env.COSMOS_DB_NAME;
        this.ContainerName = process.env.COSMOS_DB_CONTAINER;
        const client = new cosmos_1.CosmosClient(this.ConnectionString);
        const database = client.database(this.DatabaseName);
        const container = database.container(this.ContainerName);
        return container;
    }
}
exports.DataConnection = DataConnection;
//# sourceMappingURL=DataConnection.js.map