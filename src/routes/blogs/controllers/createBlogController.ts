import {Response} from "express";
import {ReqBody} from "../../types/reqTypes";
import {BlogInputModel, BlogViewModel} from "../types/blogsTypes";
import {blogsServ} from "../../../domain/blogsServ";
import {blogMaper} from "../../../db/mapers/blogMaper";


export async function createBlogController(req: ReqBody<BlogInputModel>, res: Response<BlogViewModel>) {
    const newBlog = await blogsServ.create(req.body); // Создание сетевого журнала
    
    res.status(201).json(blogMaper(newBlog)); // Возврат созданного сетевого журнала
} // Контролёр, отвечающий за создание и возврат сетевого журнала
