# How to work with entity framework

_for more Infos check https://docs.microsoft.com/en-us/ef/core/get-started/overview/first-app?tabs=netcore-cli_

- Install CLI `dotnet tool install --global dotnet-ef`
- Create Model classes, create migration and run the project

## Creating a new migration

- Create a new or update an existing model class
- New: Insert a DbSet in MarbleCollectorContext
- Run migration by running `dotnet ef migrations add <migrationName>`
- Execute migration by running `dotnet ef database update` or launch the project

*Any commands with `dotnet ef` must be run in the project directory

## How can i find the database?

- By default it is created locally on C:\temp\marblecollector.db
- Use the tool https://sqlitebrowser.org/dl/ to show your database