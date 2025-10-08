import {Response, NextFunction} from "express";
import {ReqParamBody} from "../../present/types/reqTypes";
import {BlogIdModel} from "../../present/routes/blogs/types/blogsTypes";
import {PostInputModel} from "../../present/routes/posts/types/postsTypes";


export function addBlogId(req: ReqParamBody<BlogIdModel, PostInputModel>, res: Response, next: NextFunction) {
    req.body.blogId = req.params.id; // Добавление найденного идентификатора
    next(); // Передача управления дальше
} // Добавление идентификатора текущего сетевого журнала при создании записи
