"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserGetAllAction_1 = require("./controller/UserGetAllAction");
const UserGetByIdAction_1 = require("./controller/UserGetByIdAction");
const UserSaveAction_1 = require("./controller/UserSaveAction");
const MessageController_1 = require("./controller/MessageController");
/**
 * All application routes.
 */
exports.AppRoutes = [
    {
        path: "/users",
        method: "get",
        action: UserGetAllAction_1.userGetAllAction
    },
    {
        path: "/user/:id",
        method: "get",
        action: UserGetByIdAction_1.userGetByIdAction
    },
    {
        path: "/users",
        method: "post",
        action: UserSaveAction_1.userSaveAction
    },
    {
        path: "/send",
        method: "get",
        action: MessageController_1.MessageController
    }
];
//# sourceMappingURL=routes.js.map