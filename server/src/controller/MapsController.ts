import { Request, Response } from "express";
import { googleMapsApiKey } from "../sensitive";
import { accountSid, authToken } from "../sensitive";


export async function MapsController(request: Request, response: Response) {

  const https = require('https');
  const googleMapsApiEndpoint = 'https://maps.googleapis.com/maps/api/distancematrix/json?';
  const destinations = '&destinations=11800+Domain+Blvd+Austin+TX';
  const origins = '&origins=11011+Domain+Drive+Austin+TX';
  const mode = '&mode=walking';
  const language = '&language=en-EN';
  const key = '&key=' + googleMapsApiKey;
  const units = 'units=imperial';

  const googleMapsQuery = googleMapsApiEndpoint + units + origins + destinations + mode + language + key;

  https.get(googleMapsQuery, (res) => {
    console.log('statusCode:', res.statusCode);

    var body = '';

    res.on('data', function (chunk) {
      body += chunk;
    });

    res.on('end', function () {
      var mapsResponse = JSON.parse(body);
      console.log("Got a response: ", mapsResponse);

      var timeToDestination = mapsResponse.rows[0].elements[0].duration.text;
      var numberOfMins = parseInt(timeToDestination.split(' ')[0]);
      console.log(numberOfMins);

      if (numberOfMins < 15) {
        const client = require('twilio')(accountSid, authToken);

        client.messages
          .create({
            body: 'The Car Bar closest to you is at the HomeAway Office in the Domain. It is a 14 minute walk away from you!', // this is message body for texting
            from: '+15037147388', //This is CarBar's Twilio number
            //Add media to a message 
            //mediaUrl: 'https://raw.githubusercontent.com/Jac21/carbar-frontend/master/public/img/V1.png',
            to: +17348349568 //Customer's number
          })
          .then(message => console.log(message.sid))
          .catch(err => console.error(err));
        // console.log(user.PHONE_NUMBER);

      }
      console.log("Time to CarBar: " + timeToDestination)

      response.send(mapsResponse);
    });

  }).on('error', (e) => {
    console.error(e);
  });
}