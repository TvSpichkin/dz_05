import {Response} from "express";
import {ReqBody} from "../../../types/reqTypes";
import {userFields, UserInputModel, UserViewModel} from "../types/usersTypes";
import {APIErrorResult, FieldError} from "../../../types/outputErrorsType";
import {usersServ} from "../../../../domain/usersServ";
import {userMaper} from "../../../../db/mapers/userMaper";


export async function createUserController(req: ReqBody<UserInputModel>, res: Response<UserViewModel | APIErrorResult>) {
    const newUser = await usersServ.create(req.body); // Создание пользователя
    
    if(newUser.isSuccess) res.status(201).json(userMaper(newUser.ent)); // Возврат созданного пользователя
    else res.status(400).json({errorsMessages: [{
        message: (newUser.errField == userFields.email ? "Адрес электронной почты" : "Вход") + " должен быть уникальным",
        field: newUser.errField
    }]}); // Отправка ошибки ввода данных
} // Контролёр, отвечающий за создание и возврат пользователя
