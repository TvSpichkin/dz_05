import express from "express";


export const authRout = express.Router(); // Объявление маршрутизатора проверки подлинности пользователя

//authRout.post("/", ...authValidators, loginAuthController); // Проверка подлинности пользователя