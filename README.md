# Google-Calendar-API

1. Add .env file in the project root directory which has the below data.
```
CLIENT_ID = <OAuth2 Client Id>
CLIENT_SECRET = <OAuth2 Client Secret>
REDIRECT_URL = http://localhost:8000/rest/v1/calendar/redirect/
```
2. Use `npm install` in the project root directory to install all the dependencies.
3. Use `npm start` to start the server.
4. Open URL `http://localhost:8000/rest/v1/calendar/init/` in any browser and authenticate and authorise using OAuth to view the Calendar Events.
