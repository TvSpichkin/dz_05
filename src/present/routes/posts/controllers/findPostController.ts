import {Response} from "express";
import {ReqParam} from "../../../types/reqTypes";
import {PostIdModel, PostViewModel} from "../types/postsTypes";
import {postsQueryRep} from "../../../../db/repository/posts/postsQueryRep";
import {postMaper} from "../../../../db/mapers/postMaper";


export async function findPostController(req: ReqParam<PostIdModel>, res: Response<PostViewModel>) {
    const post = await postsQueryRep.read(+req.params.id); // Поиск записи
    
    if(post) res.json(postMaper(post)); // Получение искомой записи
    else res.sendStatus(404); // Если не найдено, то возрат 404 статуса
} // Контролёр, отвечающий за выдачу искомой записи
