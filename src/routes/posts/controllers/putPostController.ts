import {Response} from "express";
import {ReqParamBody} from "../../routTypes/reqTypes";
import {PostIdModel, PostInputModel} from "../types/postsTypes";
import {postsServ} from "../../../domain/postsServ";


export async function putPostController(req: ReqParamBody<PostIdModel, PostInputModel>, res: Response) {
    if(await postsServ.put(req.body, +req.params.id)) res.sendStatus(204); // Отправка успешного состояния «нет содержимого»
    else res.sendStatus(404); // Если не найдено, то возрат 404 статуса
} // Контролёр, отвечающий за изменение выбранной записи
