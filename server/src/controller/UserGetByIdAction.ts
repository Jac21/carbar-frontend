import { Request, Response } from "express";
import { getManager } from "typeorm";
import { User } from "../entity/User";

/**
 * Loads user by a given id.
 */
export async function userGetByIdAction(request: Request, response: Response) {

  // get a user repository to perform operations with user
  const userRepository = getManager().getRepository(User);

  // load a user by a given user id
  const user = await userRepository.findOne(request.params.id);

  // if user was not found return 404 to the client
  if (!user) {
    response.status(404);
    response.end();
    return;
  }

  // return loaded user
  response.send(user);
}
