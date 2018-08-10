import { userGetAllAction } from "./controller/UserGetAllAction";
import { userGetByIdAction } from "./controller/UserGetByIdAction";
import { userSaveAction } from "./controller/UserSaveAction";

import { MessageController } from "./controller/MessageController";

/**
 * All application routes.
 */
export const AppRoutes = [
  {
    path: "/users",
    method: "get",
    action: userGetAllAction
  },
  {
    path: "/user/:id",
    method: "get",
    action: userGetByIdAction
  },
  {
    path: "/users",
    method: "post",
    action: userSaveAction
  },
  {
    path: "/send",
    method: "get",
    action: MessageController
  }
];
