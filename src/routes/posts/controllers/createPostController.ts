import {Response} from "express";
import {ReqBody} from "../../routTypes/reqTypes";
import {PostInputModel, PostViewModel} from "../types/postsTypes";
import {postsQueryRep} from "../../../db/repository/posts/postsQueryRep";
import {postsServ} from "../../../domain/postsServ";
import {postMaper} from "../../../db/mapers/postMaper";


export async function createPostController(req: ReqBody<PostInputModel>, res: Response<PostViewModel>) {
    const newPost = await postsQueryRep.read(await postsServ.create(req.body)); // Создание записи
    
    res.status(201).json(postMaper(newPost!)); // Возврат созданной записи
} // Контролёр, отвечающий за создание и возврат записи
