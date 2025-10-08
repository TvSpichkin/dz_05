import express from "express";
import {userValidators} from "../../../middlewares/users/userValidators";


export const usersRout = express.Router(); // Объявление маршрутизатора пользователей

//usersRout.post("/", ...userValidators, createUserController); // Создание записи
