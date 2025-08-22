import {Response} from "express";
import {blogsServ} from "../../../domain/blogsServ";
import {ReqParam} from "../../types/reqTypes";
import {BlogIdModel} from "../types/blogsTypes";


export async function delBlogController(req: ReqParam<BlogIdModel>, res: Response) {
    await blogsServ.del(req.params.id); // Удаление выбранного сетевого журнала
    res.sendStatus(204); // Отправка успешного состояния «нет содержимого»
} // Контролёр, отвечающий за удаление выбранного сетевого журнала
