import {Response} from "express";
import {ReqQuery} from "../../types/reqTypes";
import {QueryBlogInputModel} from "../types/queryBlogTypes";
import {Paginator, paginator} from "../../present/paginator";
import {BlogViewModel, blogFields, TypeBlogFields} from "../types/blogsTypes";
import {ProtoFilterType} from "../../../db/repository/types/typesRepDB";
import {BlogDbType} from "../../../db/repository/types/blogsDbTypes";
import {blogsQueryRep} from "../../../db/repository/blogs/blogsQueryRep";
import {blogMaper} from "../../../db/mapers/blogMaper";


export async function getBlogsController(req: ReqQuery<QueryBlogInputModel>, res: Response<Paginator<BlogViewModel>>) {
    const q = req.query,
    elemsSkip = q.pageSize*(q.pageNumber - 1), // Количество пропущенных элементов
    sortBy = q.sortBy, // Задание исходного значения поля сортировки as TypeBlogFields
    searchNameFilt = q.searchNameTerm ? // Данные поискового термина для генерации фильтра
        [{key: blogFields.name, value: q.searchNameTerm, way: 1}] : [],
    [totalCount, blogs] = await blogsQueryRep.readAll(elemsSkip, q.pageSize, sortBy, q.sortDirection, searchNameFilt); // Получение сетевых журналов и их количества
    
    res.json(paginator(q.pageNumber, q.pageSize, totalCount, blogs.map(blogMaper))); // Нумерация страниц
} // Контролёр, отвечающий за выдачу сетевых журналов
