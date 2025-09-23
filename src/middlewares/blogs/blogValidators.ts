import {body} from "express-validator";
import {SetLen} from "../settingsLength";
import {adminMiddleware} from "../global/adminMiddleware";
import {inputCheckErrorsMiddleware} from "../global/inputCheckErrorsMiddleware";


const nameValidator = body("name").isString().withMessage("Имя не является строкой")
        .trim().isLength({min: SetLen.Min.BLOG.NAME, max: SetLen.Max.BLOG.NAME})
        .withMessage("Имя содержит больше " + SetLen.Max.BLOG.NAME + " символов или является пустым"), // Проверка правильности входящего имени
    descriptionValidator = body("description").isString().withMessage("Описание не является строкой")
        .trim().isLength({min: SetLen.Min.BLOG.DESCRIPTION, max: SetLen.Max.BLOG.DESCRIPTION})
        .withMessage("Описание содержит больше " + SetLen.Max.BLOG.DESCRIPTION + " символов или является пустым"), // Проверка правильности входящего описания
    websiteUrlValidator = body("websiteUrl").isString().withMessage("ЕУР сетевого узла не является строкой")
        .trim().isLength({min: SetLen.Min.BLOG.WebsiteUrl, max: SetLen.Max.BLOG.WebsiteUrl})
        .withMessage("ЕУР сетевого узла содержит больше " + SetLen.Max.BLOG.WebsiteUrl + " символов или является пустым")
        .matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/)
        .withMessage("Строка не является единым указателем ресурсов"); // Проверка правильности входящего ЕУР сетевого узла

export const blogValidators = [
    adminMiddleware,
    
    nameValidator,
    descriptionValidator,
    websiteUrlValidator,
    
    inputCheckErrorsMiddleware
]; // Набор проверок для создания и изменения сетевых журналов
