#!/bin/bash
# ======================================================================================================
# This script generates a CosmosDB instance with a database named "maindb" and a container named "data".
# ======================================================================================================

# Variables
suffix=$RANDOM
cosmosDbInstanceName="dbbacktoschool$suffix"
databaseName="maindb"
containerName="data"
partitionKey="/itemType"
location="centralus"

# Only needed when executing locally and not in Cloud Shell
# echo "Logging in to Learn Live Sandbox - make sure you have activated one at aka.ms/learnlivesandbox. If you haven't, please cancel this script using CTRL+C."
# az login --tenant learn.docs.microsoft.com
# printf "\n"

printf "Getting resource group name from sandbox...\n"
resourceGroup=$(az group list --query '[0].name' --output tsv)
printf "Resource group: %s\n" $resourceGroup
printf "\n"

# Set defaults for all following commands
az configure --defaults group=$resourceGroup
az configure --defaults location=$location 

printf "Creating a CosmosDB instance named '%s'...this can take long. I mean, really long.\n" $cosmosDbInstanceName
az cosmosdb create --name $cosmosDbInstanceName

# Create a database.
printf "Creating a database named '%s' in the instance '%s'\n" $databaseName $cosmosDbInstanceName
az cosmosdb sql database create --name $databaseName --account-name $cosmosDbInstanceName

# Create a container in the database
printf "Creating a container named '%s' in database '%s'.\n" $containerName $databaseName
az cosmosdb sql container create --name $containerName --partition-key-path $partitionKey --account-name $cosmosDbInstanceName --database-name $databaseName

# Get the primary connection string
printf "Getting primary connection string for instance '%s'.\n" $cosmosDbInstanceName
connectionString=$(az cosmosdb keys list --name $cosmosDbInstanceName --type connection-strings --query 'connectionStrings[0].connectionString' --output tsv)
masterKey=$(az cosmosdb keys list --name $cosmosDbInstanceName --query primaryMasterKey --output tsv)

printf "\n\nCosmos DB instance name: %s" $cosmosDbInstanceName
printf "\nCosmos DB master key: %s" $masterKey
printf "\nConnection string: %s\n\n" $connectionString