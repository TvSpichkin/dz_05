import express from "express";


export const authRout = express.Router(); // Объявление маршрутизатора проверки подлинности пользователя

//authRout.post("/", ...userValidators, createUserController); // Проверка подлинности пользователя