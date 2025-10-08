import {Response, NextFunction} from "express";
import {QueryBlogInputModel} from "../../present/routes/blogs/types/queryBlogTypes";
import {chStr, queryGetMiddleware} from "../global/queryGetMiddleware";
import {blogFields} from "../../present/routes/blogs/types/blogsTypes";
import {ReqQuery} from "../../present/types/reqTypes";
import {SetLen} from "../settingsLength";


function checkSB(sb: QueryBlogInputModel["sortBy"]): boolean {
    return chStr(sb) && blogFields.hasOwnProperty(sb);
} // Проверка правильности входящего поля сортировки

function queryGetBlogsMW(req: ReqQuery<QueryBlogInputModel>, res: Response, next: NextFunction) {
    const q = req.query;
    
    if(typeof q.searchNameTerm === "string") {
        const snt = q.searchNameTerm.trim();
        if(!snt || snt.length > SetLen.Max.BLOG.NAME) q.searchNameTerm = undefined; // Задание исходного значения поискового термина
    } // Проверка правильности входящего поискового термина для имени
    
    if(!checkSB(q.sortBy)) q.sortBy = blogFields.createdAt; // Задание исходного значения поля сортировки
    
    next(); // Передача управления дальше
} // Обработка запросов с вопросом на правильные значения

export const queryBlogsMWs = [queryGetMiddleware, queryGetBlogsMW]; // Набор обработчиков запросов с вопросом для сетевых журналов
