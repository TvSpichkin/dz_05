import {Response} from "express";
import {ReqQuery} from "../../../types/reqTypes";
import {QueryBlogInputModel} from "../types/queryBlogTypes";
import {Paginator, paginator} from "../../../tools/paginator";
import {BlogViewModel} from "../types/blogsTypes";
import {getPFilt} from "../../../../tools/methodPFilt";
import {blogDbFields} from "../../../../db/types/blogsDbTypes";
import {blogsQueryRep} from "../../../../db/repository/blogs/blogsQueryRep";
import {blogMaper} from "../../../../db/mapers/blogMaper";


export async function getBlogsController(req: ReqQuery<QueryBlogInputModel>, res: Response<Paginator<BlogViewModel>>) {
    const q = req.query,
    elemsSkip = q.pageSize*(q.pageNumber - 1), // Количество пропущенных элементов
    sortBy = blogDbFields[q.sortBy], // Задание исходного значения поля сортировки
    searchNameFilt = q.searchNameTerm ? [getPFilt(blogDbFields.name, q.searchNameTerm, 1)] : [], // Данные поискового термина для генерации фильтра
    [totalCount, blogs] = await blogsQueryRep.readAll(elemsSkip, q.pageSize, sortBy, q.sortDirection, searchNameFilt); // Получение сетевых журналов и их количества
    
    res.json(paginator(q.pageNumber, q.pageSize, totalCount, blogs.map(blogMaper))); // Нумерация страниц
} // Контролёр, отвечающий за выдачу сетевых журналов
