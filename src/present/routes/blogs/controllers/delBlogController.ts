import {Response} from "express";
import {ReqParam} from "../../../types/reqTypes";
import {BlogIdModel} from "../types/blogsTypes";
import {blogsServ} from "../../../../domain/blogsServ";


export async function delBlogController(req: ReqParam<BlogIdModel>, res: Response) {
    if(await blogsServ.del(+req.params.id)) res.sendStatus(204); // Отправка успешного состояния «нет содержимого»
    else res.sendStatus(404); // Если не найдено, то возрат 404 статуса
} // Контролёр, отвечающий за удаление выбранного сетевого журнала
