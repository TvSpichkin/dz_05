import {Response} from "express";
import {ReqParam} from "../../types/reqTypes";
import {BlogIdModel, BlogViewModel} from "../types/blogsTypes";
import {blogsServ} from "../../../domain/blogsServ";


export async function findBlogController(req: ReqParam<BlogIdModel>, res: Response<BlogViewModel>) {
    res.json(await blogsServ.maper(res.locals.findBlog)); // Получение искомого сетевого журнала
} // Контролёр, отвечающий за выдачу искомого сетевого журнала
