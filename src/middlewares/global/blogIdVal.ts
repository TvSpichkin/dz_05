import {Response, NextFunction} from "express";
import {blogsRepDB} from "../../db/repository/blogs/blogsRepDB";

export async function blogIdVal(req: any, res: Response, next: NextFunction) {
    if(await blogsRepDB.check(+req.params.id)) next(); // Передача управления дальше
    else res.sendStatus(404); // Если идентификатор не натуральный, то возрат 404 статуса
} // Проверка существования сетевого журнала в БД по входящему идентификатору
