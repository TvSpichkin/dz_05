import {Response, NextFunction} from "express";
import {ReqParamBody} from "../../routes/routTypes/reqTypes";
import {BlogIdModel} from "../../routes/blogs/types/blogsTypes";
import {PostInputModel} from "../../routes/posts/types/postsTypes";


export function addBlogId(req: ReqParamBody<BlogIdModel, PostInputModel>, res: Response, next: NextFunction) {
    req.body.blogId = req.params.id; // Добавление найденного идентификатора
    next(); // Передача управления дальше
} // Добавление идентификатора текущего сетевого журнала при создании записи
