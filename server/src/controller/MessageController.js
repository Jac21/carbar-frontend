"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = require("../entity/User");
const sensitive_1 = require("../sensitive");
const sensitive_2 = require("../sensitive");
function MessageController(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = require('twilio')(sensitive_1.accountSid, sensitive_1.authToken);
        const userRepository = typeorm_1.getManager().getRepository(User_1.User);
        const users = yield userRepository.find();
        const https = require('https');
        const googleMapsApiEndpoint = 'https://maps.googleapis.com/maps/api/distancematrix/json?';
        const destinations = '&destinations=11800+Domain+Blvd+Austin+TX';
        const mode = '&mode=walking';
        const language = '&language=en-EN';
        const key = '&key=' + sensitive_2.googleMapsApiKey;
        const units = 'units=imperial';
        const _origins = '&origins=';
        users.forEach(function (user) {
            var location = user.LOCATION;
            location = location.split(' ').join('+');
            console.log(location);
            var origins = _origins + location;
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
                        const client = require('twilio')(sensitive_1.accountSid, sensitive_1.authToken);
                        client.messages
                            .create({
                            body: 'Welcome to Car Bar! The Car Bar closest to you is at the HomeAway Office in the Domain. It is a ' + timeToDestination + ' walk away from you!',
                            from: '+15037147388',
                            //Add media to a message 
                            mediaUrl: 'https://raw.githubusercontent.com/Jac21/carbar-frontend/master/public/img/V1.png',
                            to: user.PHONE_NUMBER //Customer's number
                        })
                            .then(message => console.log(message.sid))
                            .catch(err => console.error(err));
                        console.log(user.PHONE_NUMBER);
                    }
                    console.log("Time to CarBar: " + timeToDestination);
                    //response.send(mapsResponse);
                });
            }).on('error', (e) => {
                console.error(e);
            });
            console.log(user.PHONE_NUMBER);
        });
        response.send('Send messages to all users within 15 mins walking distance HomeAway');
    });
}
exports.MessageController = MessageController;
//# sourceMappingURL=MessageController.js.map