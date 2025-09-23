import {body} from "express-validator";
import {SetLen} from "../settingsLength";
import {adminMiddleware} from "../global/adminMiddleware";
import {inputCheckErrorsMiddleware} from "../global/inputCheckErrorsMiddleware";


const loginValidator = body("login").isString().withMessage("Вход не является строкой")
        .trim().isLength({min: SetLen.Min.USER.LOGIN, max: SetLen.Max.USER.LOGIN})
        .withMessage("Вход содержит больше " + SetLen.Max.USER.LOGIN + " символов или является пустым")
        .matches(/^[a-zA-Z0-9_-]*$/).withMessage("Строка содержит неверные символы"), // Проверка правильности входа
    passwordValidator = body("password").isString().withMessage("Пароль не является строкой")
        .trim().isLength({min: SetLen.Min.USER.PASSWORD, max: SetLen.Max.USER.PASSWORD})
        .withMessage("Пароль содержит больше " + SetLen.Max.USER.PASSWORD + " символов или является пустым"), // Проверка правильности входящего пароля
    emailValidator = body("email").isString().withMessage("Электронная почта не является строкой")
        .trim().isLength({min: SetLen.Min.USER.EMAIL, max: SetLen.Max.USER.EMAIL})
        .withMessage("Электронная почта содержит больше " + SetLen.Max.USER.EMAIL + " символов или является пустой")
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).withMessage("Строка не является электронной почтой"); // Проверка правильности входящей электронной почты

export const userValidators = [
    adminMiddleware,
    
    loginValidator,
    passwordValidator,
    emailValidator,
    
    inputCheckErrorsMiddleware
]; // Набор проверок для создания и изменения пользователей
