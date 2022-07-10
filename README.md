
## Getting Started

### Prerequisites

[Node.js](https://nodejs.org/en/) must be installed to run this sample.

## Running the sample

1. Configure authentication and authorization parameters:
   1. Open `.env`
   2. Provide `"CLIENT_ID"` with your app/client ID on AAD Portal.
   3. Provide `"TENANT_ID"` (*note*: This is for multi-tenant applications located on the global Azure cloud. For more information, see the [documentation](https://docs.microsoft.com/azure/active-directory/develop/quickstart-v2-javascript-auth-code)).
   4. Provide `"REDIRECT_URI"` with the redirect uri you setup on AAD Portal (In localhost the port need to match with PORT env).
   5. Provide `"PORT"` with the port were the application will start.
2. To start the sample application, run `npm start`.
3. Finally, open a browser and navigate to [http://localhost:3000](http://localhost:3000).
