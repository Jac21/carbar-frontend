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
/**
 * Loads user by a given id.
 */
function userGetByIdAction(request, response) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var userRepository, user;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        // get a user repository to perform operations with user
                        userRepository = typeorm_1.getManager().getRepository(User_1.User);
                        // load a user by a given user id

                        _context.next = 3;
                        return userRepository.findOne(request.params.id);

                    case 3:
                        user = _context.sent;

                        if (user) {
                            _context.next = 8;
                            break;
                        }

                        response.status(404);
                        response.end();
                        return _context.abrupt("return");

                    case 8:
                        // return loaded user
                        response.send(user);

                    case 9:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
}
exports.userGetByIdAction = userGetByIdAction;
//# sourceMappingURL=UserGetByIdAction.js.map
//# sourceMappingURL=UserGetByIdAction.js.map