import {body} from "express-validator";
import {SetLen} from "../settingsLength";
import {SetRE} from "../settingsRegExp";
import {adminMiddleware} from "../global/adminMiddleware";
import {inputCheckErrorsMiddleware} from "../global/inputCheckErrorsMiddleware";


const loginValidator = body("login").isString().withMessage("Вход не является строкой")
        .trim().isLength({min: SetLen.Min.USER.LOGIN, max: SetLen.Max.USER.LOGIN})
        .withMessage("Вход содержит больше " + SetLen.Max.USER.LOGIN + " символов или является пустым")
        .matches(SetRE.USER.LOGIN).withMessage("Строка содержит неверные символы"), // Проверка правильности входа
    passwordValidator = body("password").isString().withMessage("Пароль не является строкой")
        .trim().isLength({min: SetLen.Min.USER.PASSWORD, max: SetLen.Max.USER.PASSWORD})
        .withMessage("Пароль содержит больше " + SetLen.Max.USER.PASSWORD + " символов или является пустым"), // Проверка правильности входящего пароля
    emailValidator = body("email").isString().withMessage("Адрес электронной почты не является строкой")
        .trim().isLength({min: SetLen.Min.USER.EMAIL, max: SetLen.Max.USER.EMAIL})
        .withMessage("Адрес электронной почты содержит больше " + SetLen.Max.USER.EMAIL + " символов или является пустым")
        .matches(SetRE.USER.EMAIL).withMessage("Строка не является адресом электронной почты"); // Проверка правильности входящей электронной почты

export const userValidators = [
    adminMiddleware,
    
    loginValidator,
    passwordValidator,
    emailValidator,
    
    inputCheckErrorsMiddleware
]; // Набор проверок для создания и изменения пользователей
