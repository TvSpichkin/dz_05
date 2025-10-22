import express from "express";


export const authRout = express.Router(); // Объявление маршрутизатора проверки подлинности пользователя

//authRout.post("/login", ...userValidators, createUserController); // Проверка подлинности пользователя