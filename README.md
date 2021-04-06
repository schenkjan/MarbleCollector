# MarbleCollector

This repository is hosting the source code for the MarbleCollector project.

## Try it out

The MarbleCollector web app is hosted in Azure and can be tried out by using the following urls.

| Component | Url                                             | Description               |
| --------- | ----------------------------------------------- | ------------------------- |
| Frontend  | https://marblecollector.z1.web.core.windows.net | Will show react frontend  |
| Backend   | https://marblecollector-api.azurewebsites.net   | Will show swagger API doc |

Mind that this is a shared instance which is publicly available.

## Test users

The following users are available in the app by default and are also seeded when running locally.

Family "Muster"

| Username | Password | Role   |
| -------- | -------- | ------ |
| peter    | 123456   | Parent |
| petra    | 123456   | Parent |
| lars     | 123456   | Child  |
| lara     | 123456   | Child  |
| lena     | 123456   | Child  |

### Test scenario

This test scenario can be used to see most features of MarbleCollector in action:

1. Open three independent browser instances (e.g. profiles)
2. Login with one parent account and two children
3. Follow the steps in the [OneNote](https://bernerfachhochschule-my.sharepoint.com/personal/schej3_bfh_ch/_layouts/15/Doc.aspx?sourcedoc={5bc7717f-aff4-4353-b511-8e8ad95dfed0}&action=edit&wd=target%28Untitled%20Section.one%7Ccecf8b86-d33f-4d4c-bf0d-87bab836b0fd%2FDemo%20f%C3%BCr%20Pr%C3%A4si%7Cd44a5142-8dab-45bf-8332-fa05bc7a288d%2F%29&wdorigin=703)

## Run it locally

To run it locally you must first get the code

`git checkout https://github.com/TashunkoWitko/MarbleCollector.git`

### Run api (backend)

Option 1 (simple)
Open visual studio solution and hit F5.

Option 2 (more complex)
- Install dotnet sdk and cli (.NET 5.0) -> https://dotnet.microsoft.com/download
- Run `dotnet dev-certs https --trust` so we can use https for local dev
- Go to the root of the project and run `dotnet run --project .\api\MarbleCollectorApi\MarbleCollectorApi.csproj`
- Ensure that the backend url configured in the client project matches the url where the api is listening 
  - Replace url present in file `.\client\.env.development`
  - with `https://localhost:5001`, which is the default path on our environment
- Ready to test

### Run client (frontend)

Navigate to the client folder and run `npm start`.

## Project Setup

### Repository Setup

1. Creation of ASP.NET Web API default project by using the visual studio project creation wizard.
2. Creation of react project by using the official react script `npx create-react-app marblecollector-client --template typescript`

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

- https://brettmckenzie.net/2020/03/23/azure-pipelines-copy-files-task-authentication-failed/

6. Add Azure Pipeline batch to readme

### Allow contributions/contributors

1. Grant permissions in [Github Repo](https://github.com/TashunkoWitko/MarbleCollector)
2. Grant permissions in [Azure Portal](https://portal.azure.com/#@bfh.ch/resource/subscriptions/a2bcdf72-b2d2-4aff-a317-85e0bb318f1a/users)
3. Grant permissions in [Azure DevOps](https://dev.azure.com/aescd5/MarbleCollector/_settings/projectOverview)
