import { Request, Response } from "express";
import { getManager } from "typeorm";
import { User } from "../entity/User";
import http = require('http');
import { accountSid, authToken } from "../sensitive";
import { googleMapsApiKey } from "../sensitive";

export async function MessageController(request: Request, response: Response) {

  const userRepository = getManager().getRepository(User);
  const users = await userRepository.find();

  const https = require('https');
  const googleMapsApiEndpoint = 'https://maps.googleapis.com/maps/api/distancematrix/json?';
  const mode = '&mode=walking';
  const language = '&language=en-EN';
  const key = '&key=' + googleMapsApiKey;
  const units = 'units=imperial';
  const _origins = '&origins=';

  users.forEach(function (user) {

    var location = user.LOCATION.split(' ').join('+');

    var origins = _origins + location;
    const destinations = '&destinations=' + location;

    const googleMapsQuery = googleMapsApiEndpoint + units + origins + destinations + mode + language + key;

    console.log(googleMapsQuery);

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
              // this is message body for texting
              body: 'Welcome to Car Bar! The Car Bar closest to you is a ' + timeToDestination + ' walk away from you!',
              // this is CarBar's Twilio number
              from: '+15037147388',
              // add media to a message 
              mediaUrl: 'https://raw.githubusercontent.com/Jac21/carbar-frontend/master/public/img/V1.png',
              // user's number
              to: user.PHONE_NUMBER
            })
            .then(message => console.log(message.sid))
            .catch(err => console.error(err));
          console.log(user.PHONE_NUMBER);

        }
        console.log("Time to CarBar: " + timeToDestination)

        //response.send(mapsResponse);
      });

    }).on('error', (e) => {
      console.error(e);
    });
    console.log(user.PHONE_NUMBER);
  })

  response.send('Send messages to all users within 15 mins walking distance');

}