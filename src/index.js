const dotenv = require('dotenv');
dotenv.config({});

const express = require('express');
const {google} = require('googleapis');

const app=express();
const PORT = process.env.NODE_ENV || 8000;

const auth2Client = new google.auth.OAuth2(
process.env.CLIENT_ID,
process.env.CLIENT_SECRET,
process.env.REDIRECT_URL
);

const calendar = google.calendar({
    version: "v3"
});

const scopes = [
    'https://www.googleapis.com/auth/calendar'
  ];

app.get("/rest/v1/calendar/init/", (req, res, next)=>{
    const url = auth2Client.generateAuthUrl({
        access_type:'offline',
        scope:scopes
    });
    res.redirect(url);
});

app.get('/rest/v1/calendar/redirect/', async (req, res)=>{
    const code = req.query.code;
    const {tokens} = await auth2Client.getToken(code)
    auth2Client.setCredentials(tokens);

    const result = await calendar.events.list({
        calendarId: 'primary',
        auth: auth2Client
      });
    const events = result.data.items;
    if (!events || events.length === 0) {
        res.send('No events data found.');
    }
    const responseBody = events.map((event, i) => {
        const start = event.start.dateTime || event.start.date;
        return {startDateTime: start, eventSummary: event.summary, eventLocation: event.location};
      });
    res.write(JSON.stringify(responseBody, null, 2));
});

app.listen(PORT, ()=>{
    console.log("Server has started on port", PORT);
});