import express from "express";
import {authValidators} from "../../../middlewares/auth/authValidators";
import {loginAuthController} from "./controllers/loginAuthController";


export const authRout = express.Router(); // Объявление маршрутизатора проверки подлинности пользователя

authRout.post("/", ...authValidators, loginAuthController); // Проверка подлинности пользователя
