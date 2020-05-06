# backtoschool api-functions

This is a repository for the Series 2 of Learn Live on Azure Functions. It contains the functions used for the series, written in TypeScript working against a Cosmos DB database

## Setup
For developing locally you would often have a local.setting.json file that stores your configuration settings. For example:

```
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    
    "CONNECTION_STRING": "[COSMOS DB CONNECTION STRING]",
    "COSMOS_DB_NAME": "maindb",
    "COSMOS_DB_CONTAINER": "data"
  },
  "Host": {
    "CORS": "*"
  }
}
 
```