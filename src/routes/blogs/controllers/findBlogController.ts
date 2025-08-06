import {Response} from "express";
import {ReqParam} from "../../types/reqTypes";
import {BlogIdModel, BlogViewModel} from "../types/blogsTypes";
import {blogsQueryRep} from "../../../db/repository/blogs/blogsQueryRep";
import {blogMaper} from "../../../db/mapers/blogMaper";


export async function findBlogController(req: ReqParam<BlogIdModel>, res: Response<BlogViewModel>) {
    const blog = await blogsQueryRep.read(+req.params.id); // Поиск сетевого журнала
    
    if(blog) res.json(blogMaper(blog)); // Получение искомого сетевого журнала
    else res.sendStatus(404); // Если не найдено, то возрат 404 статуса
} // Контролёр, отвечающий за выдачу искомого сетевого журнала
