# MarbleCollector
The repository potentially hosting the source code for the MarbleCollector project.

## Setup

### Repository Setup

1. Creation of ASP.NET Web API default project by using the visual studio project creation wizard.
2. Creation of react project by using the official react script `npx create-react-app marblecollector-client`

### Azure DevOps Setup
According to the documentation https://docs.microsoft.com/en-us/azure/devops/pipelines/create-first-pipeline the following steps were executed:

1. Login to Azure DevOps https://dev.azure.com with BFH Account
2. Create a new private project `MarbleCollector`
3. Navigate to pipeline and create new


## Run

### Run client (frontend)
Navigate to the client folder and run `npm start`

### Run api (backend)
Open visual studio solution and hit F5

## Deploy
We want to use Azure to host the MarbleCollector web app.
The aim is to have a continuous integration/deployment proccess in place (Azure DevOps).
