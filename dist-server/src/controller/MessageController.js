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
var env_1 = require("../../env");
var env_2 = require("../../env");
function MessageController(request, response) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var userRepository, users, https, googleMapsApiEndpoint, mode, language, key, units, _origins;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        userRepository = typeorm_1.getManager().getRepository(User_1.User);
                        _context.next = 3;
                        return userRepository.find();

                    case 3:
                        users = _context.sent;
                        https = require("https");
                        googleMapsApiEndpoint = "https://maps.googleapis.com/maps/api/distancematrix/json?";
                        mode = "&mode=walking";
                        language = "&language=en-EN";
                        key = "&key=" + env_2.googleMapsApiKey;
                        units = "units=imperial";
                        _origins = "&origins=";

                        users.forEach(function (user) {
                            var location = user.LOCATION.split(" ").join("+");
                            var origins = _origins + location;
                            var destinations = "&destinations=" + location;
                            var googleMapsQuery = googleMapsApiEndpoint + units + origins + destinations + mode + language + key;
                            console.log(googleMapsQuery);
                            https.get(googleMapsQuery, function (res) {
                                console.log("statusCode:", res.statusCode);
                                var body = "";
                                res.on("data", function (chunk) {
                                    body += chunk;
                                });
                                res.on("end", function () {
                                    var mapsResponse = JSON.parse(body);
                                    console.log("Got a response: ", mapsResponse);
                                    var timeToDestination = mapsResponse.rows[0].elements[0].duration.text;
                                    var numberOfMins = parseInt(timeToDestination.split(" ")[0]);
                                    console.log(numberOfMins);
                                    if (numberOfMins < 15) {
                                        var client = require("twilio")(env_1.accountSid, env_1.authToken);
                                        client.messages.create({
                                            // this is message body for texting
                                            body: "Welcome to Car Bar! The Car Bar closest to you is a " + timeToDestination + " walk away from you!",
                                            // this is CarBar's Twilio number
                                            from: "+19548668791",
                                            // add media to a message
                                            mediaUrl: "https://raw.githubusercontent.com/Jac21/carbar-frontend/master/public/img/V1.png",
                                            // user's number
                                            to: user.PHONE_NUMBER
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
                            }).on("error", function (e) {
                                console.error(e);
                            });
                            console.log(user.PHONE_NUMBER);
                        });
                        response.send("Send messages to all users within 15 mins walking distance");

                    case 13:
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