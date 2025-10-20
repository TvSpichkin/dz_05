import {Response} from "express";
import {ReqParam} from "../../../types/reqTypes";
import {UserIdModel} from "../types/usersTypes";
import {usersServ} from "../../../../domain/usersServ";


export async function delUserController(req: ReqParam<UserIdModel>, res: Response) {
    if(await usersServ.del(+req.params.id)) res.sendStatus(204); // Отправка успешного состояния «нет содержимого»
    else res.sendStatus(404); // Если не найдено, то возрат 404 статуса
} // Контролёр, отвечающий за удаление выбранного пользователя
