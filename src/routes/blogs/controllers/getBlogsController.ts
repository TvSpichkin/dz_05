import {Response} from "express";
import {ReqQuery} from "../../types/reqTypes";
import {QueryBlogInputModel} from "../types/queryBlogTypes";
import {Paginator} from "../../present/paginator";
import {BlogViewModel, blogFields, TypeBlogFields} from "../types/blogsTypes";
import { blogsQueryRep } from "../../../db/repository/blogs/blogsQueryRep";


export async function getBlogsController(req: ReqQuery<QueryBlogInputModel>, res: Response<Paginator<BlogViewModel>>) {
    const q = req.query,
    sortBy = (blogFields.hasOwnProperty(q.sortBy) ? q.sortBy : blogFields.createdAt) as TypeBlogFields; // Задание исходного значения поля сортировки
    
    res.json(await blogsQueryRep.readAll(q.searchNameTerm, sortBy, q.sortDirection, q.pageNumber, q.pageSize)); // Получение сетевых журналов
} // Контролёр, отвечающий за выдачу сетевых журналов
