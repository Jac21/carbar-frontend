"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var User_1 = require("../entity/User");
var sensitive_1 = require("../sensitive");
var sensitive_2 = require("../sensitive");
function MessageController(request, response) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var client, userRepository, users, https, googleMapsApiEndpoint, destinations, mode, language, key, units, _origins;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        client = require('twilio')(sensitive_1.accountSid, sensitive_1.authToken);
                        userRepository = typeorm_1.getManager().getRepository(User_1.User);
                        _context.next = 4;
                        return userRepository.find();

                    case 4:
                        users = _context.sent;
                        https = require('https');
                        googleMapsApiEndpoint = 'https://maps.googleapis.com/maps/api/distancematrix/json?';
                        destinations = '&destinations=11800+Domain+Blvd+Austin+TX';
                        mode = '&mode=walking';
                        language = '&language=en-EN';
                        key = '&key=' + sensitive_2.googleMapsApiKey;
                        units = 'units=imperial';
                        _origins = '&origins=';

                        users.forEach(function (user) {
                            var location = user.LOCATION;
                            location = location.split(' ').join('+');
                            console.log(location);
                            var origins = _origins + location;
                            var googleMapsQuery = googleMapsApiEndpoint + units + origins + destinations + mode + language + key;
                            console.log(googleMapsQuery);
                            https.get(googleMapsQuery, function (res) {
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
                                        var _client = require('twilio')(sensitive_1.accountSid, sensitive_1.authToken);
                                        _client.messages.create({
                                            body: 'Welcome to Car Bar! The Car Bar closest to you is at the HomeAway Office in the Domain. It is a ' + timeToDestination + ' walk away from you!',
                                            from: '+15037147388',
                                            //Add media to a message 
                                            mediaUrl: 'https://raw.githubusercontent.com/Jac21/carbar-frontend/master/public/img/V1.png',
                                            to: user.PHONE_NUMBER //Customer's number
                                        }).then(function (message) {
                                            return console.log(message.sid);
                                        }).catch(function (err) {
                                            return console.error(err);
                                        });
                                        console.log(user.PHONE_NUMBER);
                                    }
                                    console.log("Time to CarBar: " + timeToDestination);
                                    //response.send(mapsResponse);
                                });
                            }).on('error', function (e) {
                                console.error(e);
                            });
                            console.log(user.PHONE_NUMBER);
                        });
                        response.send('Send messages to all users within 15 mins walking distance HomeAway');

                    case 15:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
}
exports.MessageController = MessageController;
//# sourceMappingURL=MessageController.js.map
//# sourceMappingURL=MessageController.js.map