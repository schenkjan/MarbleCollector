# MarbleCollector

The repository potentially hosting the source code for the MarbleCollector project.

## Setup

### Repository Setup

1. Creation of ASP.NET Web API default project by using the visual studio project creation wizard.
2. Creation of react project by using the official react script `npx create-react-app marblecollector-client`

### Azure Setup

For students the student promotion may be used: https://azure.microsoft.com/en-us/free/students
The following resources were created within the Subscription and they can be accessed if your BFH account is granted permissions.

| Resource Type    |         Name         |                                                                                                                                                                                                          Url |
| ---------------- | :------------------: | -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| Resource Group   |   marblecollector    |                                                                [Link](https://portal.azure.com/#@bfh.ch/resource/subscriptions/a2bcdf72-b2d2-4aff-a317-85e0bb318f1a/resourceGroups/marblecollector/overview) |
| App Service Plan | marblecollector-plan | [Link](https://portal.azure.com/#@bfh.ch/resource/subscriptions/a2bcdf72-b2d2-4aff-a317-85e0bb318f1a/resourceGroups/marblecollector/providers/Microsoft.Web/serverFarms/marblecollector-plan/webHostingPlan) |
| App Service      | marblecollector-api  |           [Link](https://portal.azure.com/#@bfh.ch/resource/subscriptions/a2bcdf72-b2d2-4aff-a317-85e0bb318f1a/resourceGroups/marblecollector/providers/Microsoft.Web/sites/marblecollector-api/appServices) |
| Storage Account  |   marblecollector    |    [Link](https://portal.azure.com/#@bfh.ch/resource/subscriptions/a2bcdf72-b2d2-4aff-a317-85e0bb318f1a/resourceGroups/marblecollector/providers/Microsoft.Storage/storageAccounts/marblecollector/overview) |

### Azure DevOps Setup

[![Build Status](https://dev.azure.com/aescd5/MarbleCollector/_apis/build/status/TashunkoWitko.MarbleCollector?branchName=main)](https://dev.azure.com/aescd5/MarbleCollector/_build/latest?definitionId=1&branchName=main)

According to the documentation https://docs.microsoft.com/en-us/azure/devops/pipelines/create-first-pipeline the following steps were executed:

1. Login to Azure DevOps https://dev.azure.com with BFH Account
2. Create a new private project `MarbleCollector`
3. Navigate to pipeline and create new
4. Setup pipeline for .NET
5. Setup pipeline for React
6. Add Azure Pipeline batch to readme

## Run

### Run client (frontend)

Navigate to the client folder and run `npm start`

### Run api (backend)

Open visual studio solution and hit F5

## Deploy

We want to use Azure to host the MarbleCollector web app.
The aim is to have a continuous integration/deployment proccess in place (Azure DevOps).

| Component | Url                                                          |
| --------- | ------------------------------------------------------------ |
| Frontend  | https://marblecollector.z1.web.core.windows.net/             |
| Backend   | http://marblecollector-api.azurewebsites.net/weatherforecast |
