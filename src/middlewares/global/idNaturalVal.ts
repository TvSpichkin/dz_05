import {Response, NextFunction} from "express";

export async function idNaturalVal(req: any, res: Response, next: NextFunction) {
    if(+req.params.id > 0 && Number.isInteger(+req.params.id)) next(); // Передача управления дальше
    else res.sendStatus(404); // Если идентификатор не натуральный, то возрат 404 статуса
} // Первичная проверка существования входящего идентификатора
