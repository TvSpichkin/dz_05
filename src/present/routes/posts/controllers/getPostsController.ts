import {Response} from "express";
import {ReqParamQuery} from "../../../types/reqTypes";
import {BlogIdModel} from "../../blogs/types/blogsTypes";
import {QueryPostInputModel} from "../types/queryPostTypes";
import {Paginator, paginator} from "../../../tools/paginator";
import {PostViewModel} from "../types/postsTypes";
import {postDbFields} from "../../../../db/types/postsDbTypes";
import {postsQueryRep} from "../../../../db/repository/posts/postsQueryRep";
import {postMaper} from "../../../../db/mapers/postMaper";


export async function getPostsController(req: ReqParamQuery<BlogIdModel, QueryPostInputModel>, res: Response<Paginator<PostViewModel>>) {
    const q = req.query,
    elemsSkip = q.pageSize*(q.pageNumber - 1), // Количество пропущенных элементов
    sortBy = q.sortBy, // Задание исходного значения поля сортировки
    blogIdFilt = req.params.id ? [{key: postDbFields.blogId, value: +req.params.id, way: 0}] : [], // Идентификатор сетевого журнала для генерации фильтра
    [totalCount, posts] = await postsQueryRep.readAll(elemsSkip, q.pageSize, sortBy, q.sortDirection, blogIdFilt); // Задание исходного значения поля сортировки
    
    res.json(paginator(q.pageNumber, q.pageSize, totalCount, posts.map(postMaper))); // Нумерация страниц
} // Контролёр, отвечающий за выдачу записей
