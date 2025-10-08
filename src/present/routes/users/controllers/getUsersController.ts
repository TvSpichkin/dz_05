import {Response} from "express";
import {ReqQuery} from "../../../types/reqTypes";
import {QueryUserInputModel} from "../types/queryUserTypes";
import {Paginator, paginator} from "../../../tools/paginator";
import {UserViewModel} from "../types/usersTypes";
import {ProtoFilterType} from "../../../../db/types/typesRepDB";
import {UserDbType, userDbFields} from "../../../../db/types/usersDbTypes";
import {usersQueryRep} from "../../../../db/repository/users/usersQueryRep";
import {userMaper} from "../../../../db/mapers/userMaper";


export async function getUsersController(req: ReqQuery<QueryUserInputModel>, res: Response<Paginator<UserViewModel>>) {
    const q = req.query,
    elemsSkip = q.pageSize*(q.pageNumber - 1), // Количество пропущенных элементов
    sortBy = q.sortBy, // Задание исходного значения поля сортировки
    searchTermFilt: ProtoFilterType<UserDbType>[] = []; // Данные поискового термина для генерации фильтра
    
    if(q.searchLoginTerm) searchTermFilt.push({key: userDbFields.login, value: q.searchLoginTerm, way: 1}); // Добавление поискового запроса для имени пользователя
    if(q.searchEmailTerm) searchTermFilt.push({key: userDbFields.email, value: q.searchEmailTerm, way: 1}); // Добавление поискового запроса для адреса электронной почты
    
    const [totalCount, users] = await usersQueryRep.readAll(elemsSkip, q.pageSize, sortBy, q.sortDirection, searchTermFilt); // Получение пользователей и их количества
    
    res.json(paginator(q.pageNumber, q.pageSize, totalCount, users.map(userMaper))); // Нумерация страниц
} // Контролёр, отвечающий за выдачу пользователей
