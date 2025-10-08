import {Response} from "express";
import {ReqParam} from "../../../types/reqTypes";
import {PostIdModel} from "../types/postsTypes";
import {postsServ} from "../../../../domain/postsServ";


export async function delPostController(req: ReqParam<PostIdModel>, res: Response) {
    if(await postsServ.del(+req.params.id)) res.sendStatus(204); // Отправка успешного состояния «нет содержимого»
    else res.sendStatus(404); // Если не найдено, то возрат 404 статуса
} // Контролёр, отвечающий за удаление выбранной записи
