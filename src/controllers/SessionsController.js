const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { compare } = require("bcryptjs");
const authConfig = require("../configs/auth");
const { sign } = require("jsonwebtoken");

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;
    const user = await knex("users").where({ email }).first();
    const passwordMatched = await compare(password, user.password);
    const { secret, expiresIn } = authConfig.jwt;

    if(!user) {
      throw new AppError("E-mail e/ou senha incorretos", 401);
    }

    if(!passwordMatched) {
      throw new AppError("E-mail e/ou senha incorretos", 401);
    }

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })

    return response.json({user, token});
  }
}

module.exports = SessionsController;