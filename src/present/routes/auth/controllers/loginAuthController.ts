import {Response} from "express";
import {ReqBody} from "../../../types/reqTypes";
import {LoginInputModel} from "../types/authTypes";
import {usersServ} from "../../../../domain/usersServ";


export async function loginAuthController(req: ReqBody<LoginInputModel>, res: Response) {
    if(await usersServ.checkCredentials(req.body)) res.sendStatus(204); // Отправка успешного состояния «нет содержимого»
    else res.sendStatus(401); // Если учетные данные неверный, то возрат 401 статуса
} // Контролёр, отвечающий за проверку подлинности учетных данных пользователя
