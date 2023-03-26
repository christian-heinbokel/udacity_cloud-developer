// DONE: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'xs0kmv384k'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  // DONE: Create an Auth0 application and copy values from it into this map. For example:
  // domain: 'dev-nd9990-p4.us.auth0.com',
  domain: 'dev-8hc6rxazuwjucxld.us.auth0.com', // Auth0 domain
  clientId: 'rt70UlTpAngK1zFukvnjLDzlXlMAyD5L', // Auth0 client id
  callbackUrl: 'http://localhost:3001/callback'
}
