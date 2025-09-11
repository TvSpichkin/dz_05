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

const titleValidator = body("title").isString().withMessage("Название не является строкой")
        .trim().isLength({min: 1, max: SET.MaxLen.POST.TITLE})
        .withMessage("Название содержит больше " + SET.MaxLen.POST.TITLE + " символов или является пустым"), // Проверка правильности входящего названия
    shortDescriptionValidator = body("shortDescription").isString().withMessage("Краткое описание не является строкой")
        .trim().isLength({min: 1, max: SET.MaxLen.POST.ShortDescription})
        .withMessage("Краткое описание содержит больше " + SET.MaxLen.POST.ShortDescription + " символов или является пустым"), // Проверка правильности входящего краткого описания
    contentValidator = body("content").isString().withMessage("Содержание не является строкой")
        .trim().isLength({min: 1, max: SET.MaxLen.POST.CONTENT})
        .withMessage("Содержание содержит больше " + SET.MaxLen.POST.CONTENT + " символов или является пустым"), // Проверка правильности входящего содержания
    blogIdValidator = body("blogId").isString().withMessage("Идентификатор сетевого журнала не является строкой")
        .trim().custom(checkExistBlog).withMessage("Сетевого журнала, с введённым идентификатором, не существует"); // Проверка правильности входящего идентификатора сетевого журнала

export const postValidators = [
    adminMiddleware,
    
    titleValidator,
    shortDescriptionValidator,
    contentValidator,
    blogIdValidator,
    
    inputCheckErrorsMiddleware
]; // Набор проверок для создания и изменения записей
