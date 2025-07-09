import {Response, NextFunction} from "express";
import {SET} from "../../settings";
import {QueryBlogInputModel} from "../../routes/blogs/types/queryBlogTypes";
import {blogFields} from "../../routes/blogs/types/blogsTypes";
import {ReqQuery} from "../../routes/types/reqTypes";
import {chStr, queryGetMiddleware} from "../global/queryGetMiddleware";


function checkSB(sb: QueryBlogInputModel["sortBy"]) {
    return chStr(sb) && blogFields.hasOwnProperty(sb);
} // Проверка правильности входящего поля сортировки

function queryGetBlogsMW(req: ReqQuery<QueryBlogInputModel>, res: Response, next: NextFunction) {
    const q = req.query;
    
    if(typeof q.searchNameTerm === "string") {
        const snt = q.searchNameTerm.trim();
        if(!snt || snt.length > SET.MaxLen.BLOG.NAME) q.searchNameTerm = undefined; // Задание исходного значения поискового термина
    } // Проверка правильности входящего поискового термина для имени
    
    if(!checkSB(q.sortBy)) q.sortBy = blogFields.createdAt; // Задание исходного значения поля сортировки
    
    next(); // Передача управления дальше
} // Обработка запросов с вопросом на правильные значения

export const queryBlogsMWs = [queryGetBlogsMW, queryGetMiddleware]; // Набор обработчиков запросов с вопросом для сетевых журналов
