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
 * Loads all users from the database.
 */
function userGetAllAction(request, response) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var userRepository, users;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        // get a user repository to perform operations with post
                        userRepository = typeorm_1.getManager().getRepository(User_1.User);
                        // load a user by a given post id

                        _context.next = 3;
                        return userRepository.find();

                    case 3:
                        users = _context.sent;

                        // return loaded posts
                        response.send(users);

                    case 5:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
}
exports.userGetAllAction = userGetAllAction;
//# sourceMappingURL=UserGetAllAction.js.map
//# sourceMappingURL=UserGetAllAction.js.map