import {Response, NextFunction} from "express";
import {QueryUserInputModel} from "../../routes/users/types/queryUserTypes";
import {chStr, queryGetMiddleware} from "../global/queryGetMiddleware";
import {userFields} from "../../routes/users/types/usersTypes";
import {ReqQuery} from "../../routes/routTypes/reqTypes";
import {SetLen} from "../settingsLength";
import {adminMiddleware} from "../global/adminMiddleware";


function checkSB(sb: QueryUserInputModel["sortBy"]): boolean {
    return chStr(sb) && userFields.hasOwnProperty(sb);
} // Проверка правильности входящего поля сортировки

function queryGetUsersMW(req: ReqQuery<QueryUserInputModel>, res: Response, next: NextFunction) {
    const q = req.query;
    
    if(!checkSB(q.sortBy)) q.sortBy = userFields.createdAt; // Задание исходного значения поля сортировки
    
    if(typeof q.searchLoginTerm === "string") {
        const slt = q.searchLoginTerm.trim();
        if(!slt || slt.length > SetLen.Max.USER.LOGIN) q.searchLoginTerm = undefined; // Задание исходного значения поискового термина
    } // Проверка правильности входящего поискового термина для входа
    
    if(typeof q.searchEmailTerm === "string") {
        const set = q.searchEmailTerm.trim();
        if(!set || set.length > SetLen.Max.USER.EMAIL) q.searchEmailTerm = undefined; // Задание исходного значения поискового термина
    } // Проверка правильности входящего поискового термина для электронной почты
    
    next(); // Передача управления дальше
} // Обработка запросов с вопросом на правильные значения

export const queryUsersMWs = [adminMiddleware, queryGetMiddleware, queryGetUsersMW]; // Набор обработчиков запросов с вопросом для пользователей
