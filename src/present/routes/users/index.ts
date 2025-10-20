import express from "express";
import {queryUsersMWs} from "../../../middlewares/users/queryUsersMWs";
import {getUsersController} from "./controllers/getUsersController";


export const usersRout = express.Router(); // Объявление маршрутизатора пользователей

usersRout.get("/", ...queryUsersMWs, getUsersController); // Возврат всех пользователей
//usersRout.post("/", ...userValidators, createUserController); // Создание пользователя
