# Start Here

1. Use this template repository to create a private fork (click the green `Use this template` button and not the `Fork` button).
1. Follow the instructions in `INSTRUCTIONS.md`.
1. Give [@mersive-asavchenko](https://github.com/mersive-asavchenko) (`asavchenko@mersive.com`) and [@retronouns](https://github.com/retronouns) (`cgingles@mersive.com`) collaborator access when complete.
1. Inform your Mersive contact that the assignment is complete.

# Your Documentation


### Project structure

    .
    ├── src
    │   ├── components          # Frontend UI dummy components
    │   ├── helpers             # Frontend helper functions, constants, queries, etc.
    │   ├── hooks               # React hooks to encapsulate certain business logic
    │   ├── server              # Backend - Apollo server graphql server
    │   │   ├── db              # Databese connector and Apollo server data sources
    │   │   ├── query           # Graphql query functions
    │   │   ├── schema          # Graphql shemas and shema helpers
    │   │   │   └── types       # Graphql shema types
    │   │   │
    │   │   ├── sql             # SQL dump files for Sqlite3 database
    │   │   ├── utils           # Backend helper functions, constants, formatters, etc.
    │   │   ├── graphql.js      # Core module to initiate Apollo server
    │   │   └── index.js
    │   │   
    │   ├── App.js              # Main frontend container to render the Table
    │   └── index.js
    │
    └── ...

### Project details

Node version:
> v20.5.1

Some additional deps have been added.
`@graphql-tools/graphql-file-loader`, `@graphql-tools/load` and `@graphql-tools/schema` allow us to organize GraphQL schemas and type definitions into separate modules.
`datasource-sql` simplifies integrating SQL queries into GraphQL.