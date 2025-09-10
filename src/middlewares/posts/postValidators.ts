import {body} from "express-validator";
import {blogsRepDB} from "../../db/repository/blogs/blogsRepDB";
import {SET} from "../../settings";
import {adminMiddleware} from "../global/adminMiddleware";
import {inputCheckErrorsMiddleware} from "../global/inputCheckErrorsMiddleware";
import {idNaturalVal} from "../global/idNaturalVal";
import {blogIdVal} from "../global/blogIdVal";
import {addBlogId} from "./addBlogId";


async function checkExistBlog(blogId: string) {
    if(+blogId > 0 && Number.isInteger(+blogId)) {
        const checkBlog = await blogsRepDB.check(+blogId); // Поиск сетевого журнала
        
        if(!checkBlog) return Promise.reject(); // Возврат обещания
    }
    else return Promise.reject(); // Возврат обещания
} // Проверка существования заданного сетевого журнала
