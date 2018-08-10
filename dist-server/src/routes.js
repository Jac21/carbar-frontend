"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UserGetAllAction_1 = require("./controller/UserGetAllAction");
var UserGetByIdAction_1 = require("./controller/UserGetByIdAction");
var UserSaveAction_1 = require("./controller/UserSaveAction");
var MessageController_1 = require("./controller/MessageController");
/**
 * All application routes.
 */
exports.AppRoutes = [{
    path: "/users",
    method: "get",
    action: UserGetAllAction_1.userGetAllAction
}, {
    path: "/user/:id",
    method: "get",
    action: UserGetByIdAction_1.userGetByIdAction
}, {
    path: "/users",
    method: "post",
    action: UserSaveAction_1.userSaveAction
}, {
    path: "/send",
    method: "get",
    action: MessageController_1.MessageController
}];
//# sourceMappingURL=routes.js.map
//# sourceMappingURL=routes.js.map