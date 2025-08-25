import {Response} from "express";
import {ReqParamBody} from "../../types/reqTypes";
import {BlogIdModel, BlogInputModel} from "../types/blogsTypes";
import {blogsServ} from "../../../domain/blogsServ";


export async function putBlogController(req: ReqParamBody<BlogIdModel, BlogInputModel>, res: Response) {
    if(await blogsServ.put(req.body, +req.params.id)) res.sendStatus(204); // Отправка успешного состояния «нет содержимого»
    else res.sendStatus(404); // Если не найдено, то возрат 404 статуса
} // Контролёр, отвечающий за изменение выбранного сетевого журнала
