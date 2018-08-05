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
var Post_1 = require("../entity/Post");
/**
 * Saves given post.
 */
function postSaveAction(request, response) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var postRepository, newPost;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        // get a post repository to perform operations with post
                        postRepository = typeorm_1.getManager().getRepository(Post_1.Post);
                        // create a real post object from post json object sent over http

                        newPost = postRepository.create(request.body);
                        // save received post

                        _context.next = 4;
                        return postRepository.save(newPost);

                    case 4:
                        // return saved post back
                        response.send(newPost);

                    case 5:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
}
exports.postSaveAction = postSaveAction;
//# sourceMappingURL=PostSaveAction.js.map
//# sourceMappingURL=PostSaveAction.js.map