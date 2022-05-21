# MarbleCollector

This repository is hosting the source code for the MarbleCollector project.

## Try it out

The MarbleCollector web app is hosted in Azure and can be tried out by using the following urls.

| Component | Url                                                  | Description               |
| --------- | ---------------------------------------------------- | ------------------------- |
| Frontend  | https://orange-ocean-01c675603.1.azurestaticapps.net | Will show react frontend  |
| Backend   | https://marblecollectorapi.azurewebsites.net         | Will show swagger API doc |

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
3. Follow the steps in the [OneNote](https://bernerfachhochschule-my.sharepoint.com/personal/schej3_bfh_ch/_layouts/15/Doc.aspx?sourcedoc={5bc7717f-aff4-4353-b511-8e8ad95dfed0}&action=edit&wd=target%28Untitled%20Section.one%7Ccecf8b86-d33f-4d4c-bf0d-87bab836b0fd%2FDemo%20f%C3%BCr%20Pr%C3%A4si%7Cd44a5142-8dab-45bf-8332-fa05bc7a288d%2F%29&wdorigin=703) or in [PDF](doc/Demo.pdf)

## Run it locally

To run it locally you must first get the code 

`git checkout https://github.com/schenkjan/MarbleCollector.git`

### Run api (backend)

> Mind that if you use an OS other than Windows, you have to change the db connection string in the `api/MarbleCollectorApi/appsettings.Development.json` file to a path that your OS understands.

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

| Resource Type    |         Name         |                                                                                                                                                                                                                                    Url |
| ---------------- | :------------------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| Resource Group   |   marblecollector    |                                                               [Link](https://portal.azure.com/#@janschenkswisscom.onmicrosoft.com/resource/subscriptions/e2bb3e80-254b-4380-9a67-9fa854c55174/resourceGroups/MarbleCollector/overview) |
| App Service Plan | marblecollector-plan | [Link](https://portal.azure.com/#@janschenkswisscom.onmicrosoft.com/resource/subscriptions/e2bb3e80-254b-4380-9a67-9fa854c55174/resourcegroups/MarbleCollector/providers/Microsoft.Web/serverFarms/marblecollectorplan/webHostingPlan) |
| App Service      | marblecollectorapi   |           [Link](https://portal.azure.com/#@janschenkswisscom.onmicrosoft.com/resource/subscriptions/e2bb3e80-254b-4380-9a67-9fa854c55174/resourcegroups/MarbleCollector/providers/Microsoft.Web/sites/MarbleCollectorApi/appServices) |
| Static Web App   |   marblecollector    |         [Link](https://portal.azure.com/#@janschenkswisscom.onmicrosoft.com/resource/subscriptions/e2bb3e80-254b-4380-9a67-9fa854c55174/resourcegroups/MarbleCollector/providers/Microsoft.Web/staticSites/MarbleCollector/staticsite) |

### Azure DevOps Setup

[![Azure Static Web Apps CI/CD](https://github.com/schenkjan/MarbleCollector/actions/workflows/azure-static-web-apps-orange-ocean-01c675603.yml/badge.svg)](https://github.com/schenkjan/MarbleCollector/actions/workflows/azure-static-web-apps-orange-ocean-01c675603.yml)
[![Build and deploy ASP.Net Core app to Azure Web App - MarbleCollectorApi](https://github.com/schenkjan/MarbleCollector/actions/workflows/main_marblecollectorapi.yml/badge.svg)](https://github.com/schenkjan/MarbleCollector/actions/workflows/main_marblecollectorapi.yml)

According to the documentation https://docs.microsoft.com/en-us/azure/devops/pipelines/create-first-pipeline the following steps were executed:

1. Login to Azure DevOps https://dev.azure.com
2. Create a new private project `MarbleCollector`
3. Navigate to pipeline and create new
4. Setup pipeline for .NET
5. Setup pipeline for React

- https://brettmckenzie.net/2020/03/23/azure-pipelines-copy-files-task-authentication-failed/

6. Add Azure Pipeline batch to readme

### Allow contributions/contributors

1. Grant permissions in [Github Repo](https://github.com/schenkjan/MarbleCollector)
