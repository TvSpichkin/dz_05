import express from "express";
import {queryUsersMWs} from "../../../middlewares/users/queryUsersMWs";
import {getUsersController} from "./controllers/getUsersController";
import {userValidators} from "../../../middlewares/users/userValidators";
import {createUserController} from "./controllers/createUserController";
import {idNaturalVal} from "../../../middlewares/global/idNaturalVal";
import {adminMiddleware} from "../../../middlewares/global/adminMiddleware";
import {delBlogController} from "../blogs/controllers/delBlogController";


export const usersRout = express.Router(); // Объявление маршрутизатора пользователей

usersRout.get("/", ...queryUsersMWs, getUsersController); // Возврат всех пользователей
usersRout.post("/", ...userValidators, createUserController); // Создание пользователя
usersRout.delete("/:id", idNaturalVal, adminMiddleware,  delBlogController); // Удаление пользователя
