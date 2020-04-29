# book-store-api-functions

This is a repository for the Series 2 of Learn Live on Azure Functions. It contains the functions used for the series, written in TypeScript working against a Cosmos DB database

## Setup
For the most part this repository will work as is. It does rely on configuration settings. For developing locally you would often have a local.setting.json file that stores your configuration settings. For example:

```
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "CONNECTION_STRING": "(Cosmos DB Connection String)",
    "cosmosDBName": "booksmartiesdb",
    "cosmosDBContainer": "booksmartiescollection"
  },
  "Host": {
    "CORS": "*"
  }
}
```

and for the deployed application to Azure, you would set "CONNECTION_STRING", "cosmosDBName" and "cosmosDBContainer" as application settings to make the values work. Obviously these should be based on your own database.

# Cosmos DB
This application requiresa connected Cosmos DB. The original database was setup with a partition id of "/id". You will need to make sure you do the same when creating the database

# Postman 
For example requests on how to call the API, please use the following:
https://www.getpostman.com/collections/a18f130505e1183262b3
