import { Request, Response } from "express";
import { getManager } from "typeorm";
import { User } from "../entity/User";

/**
 * Saves given user.
 */
export async function userSaveAction(request: Request, response: Response) {

  // get a user repository to perform operations with user
  const userRepository = getManager().getRepository(User);

  // create a real user object from user json object sent over http
  const newuser = userRepository.create(request.body);

  // save received user
  await userRepository.save(newuser);

  // return saved user back
  response.send(newuser);
}