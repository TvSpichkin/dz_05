import {Response, NextFunction} from "express";
import {QueryPostInputModel} from "../../routes/posts/types/queryPostTypes";
import {postFields} from "../../routes/posts/types/postsTypes";
import {ReqQuery} from "../../routes/types/reqTypes";
import {chStr, queryGetMiddleware} from "../global/queryGetMiddleware";
import {idNaturalVal} from "../global/idNaturalVal";
import {blogIdVal} from "../global/blogIdVal";


function checkSB(sb: QueryPostInputModel["sortBy"]): boolean {
    return chStr(sb) && postFields.hasOwnProperty(sb);
} // Проверка правильности входящего поля сортировки

function queryGetPostsMW(req: ReqQuery<QueryPostInputModel>, res: Response, next: NextFunction) {
    const q = req.query;
    
    if(!checkSB(q.sortBy)) q.sortBy = postFields.createdAt; // Задание исходного значения поля сортировки
    
    next(); // Передача управления дальше
} // Обработка запросов с вопросом на правильные значения

export const queryPostsMWs = [queryGetMiddleware, queryGetPostsMW]; // Набор обработчиков запросов с вопросом для записей

export const queryPostsMWsBID = [
    idNaturalVal,
    queryGetMiddleware,
    queryGetPostsMW,
    blogIdVal
]; // Набор обработчиков запросов с вопросом для записей с параметром идентификатора текущего сетевого журнала
