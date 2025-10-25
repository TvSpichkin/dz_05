import {ReqBody} from "../../present/types/reqTypes";
import {LoginInputModel} from "../../present/routes/auth/types/authTypes";
import {Response, NextFunction} from "express";
import {matchedData} from "express-validator";
import {loginValidator, passwordValidator, emailValidator} from "../users/userValidators";
import {inputCheckErrorsMiddleware} from "../global/inputCheckErrorsMiddleware";


async function loginOrEmailValidator(req: ReqBody<LoginInputModel>, res: Response, next: NextFunction) {
    if(matchedData(req).loginOrEmail.includes('@')) await emailValidator("loginOrEmail").run(req);
    else await loginValidator("loginOrEmail").run(req); // Условная развилка в зависимости от содержания символа '@'
    
    next(); // Передача управления дальше
} // Проверка правильности входа или входящей электронной почты

export const authValidators = [
    loginOrEmailValidator,
    passwordValidator,
    
    inputCheckErrorsMiddleware
]; // Набор проверок для проверки подлинности пользователя
