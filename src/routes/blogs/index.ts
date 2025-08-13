import express from "express";
import {queryBlogsMWs} from "../../middlewares/blogs/queryBlogsMWs";
import {getBlogsController} from "./controllers/getBlogsController";
import {idNaturalVal} from "../../middlewares/global/idNaturalVal";
import {findBlogController} from "./controllers/findBlogController";
import {blogValidators} from "../../middlewares/blogs/blogValidators";
import {createBlogController} from "./controllers/createBlogController";
import {adminMiddleware} from "../../globalMiddlewares/adminMiddleware";
import {delBlogController} from "./controllers/delBlogController";
import {putBlogController} from "./controllers/putBlogController";
import {getPostsController} from "../posts/controllers/getPostsController";
import {postValWithoutBID} from "../posts/middlewares/postValidators";
import {createPostController} from "../posts/controllers/createPostController";


export const blogsRout = express.Router(); // Объявление маршрутизатора сетевых журналов

blogsRout.get("/", ...queryBlogsMWs, getBlogsController); // Возврат всех сетевых журналов
blogsRout.get("/:id", idNaturalVal, findBlogController); // Возврат сетевого журнала по идентификатору
blogsRout.post("/", ...blogValidators, createBlogController); // Создание сетевого журнала
blogsRout.delete("/:id", idNaturalVal, adminMiddleware,  delBlogController); // Удаление сетевого журнала
blogsRout.put("/:id", idNaturalVal, ...blogValidators, putBlogController); // Изменение сетевого журнала

blogsRout.get("/:id/posts", idNaturalVal, ...queryBlogsMWs, getPostsController); // Возврат записей для указанного сетевого журнала
blogsRout.post("/:id/posts", idNaturalVal, ...postValWithoutBID, createPostController); // Создание записи для указанного сетевого журнала
