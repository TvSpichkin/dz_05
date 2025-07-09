import express from "express";
import {queryBlogsMWs} from "../../middlewares/blogs/queryBlogsMWs";
import {queryGetMiddleware} from "../../globalMiddlewares/queryGetMiddleware";
import {getBlogsController} from "./controllers/getBlogsController";
import {findBlogValidator, blogValidators} from "./middlewares/blogValidators";
import {findBlogController} from "./controllers/findBlogController";
import {createBlogController} from "./controllers/createBlogController";
import {adminMiddleware} from "../../globalMiddlewares/adminMiddleware";
import {delBlogController} from "./controllers/delBlogController";
import {putBlogController} from "./controllers/putBlogController";
import {getPostsController} from "../posts/controllers/getPostsController";
import {postValWithoutBID} from "../posts/middlewares/postValidators";
import {createPostController} from "../posts/controllers/createPostController";


export const blogsRout = express.Router(); // Объявление маршрутизатора сетевых журналов

blogsRout.get("/", ...queryBlogsMWs, getBlogsController); // Возврат всех сетевых журналов
blogsRout.get("/:id", findBlogValidator, findBlogController); // Возврат сетевого журнала по идентификатору
blogsRout.post("/", ...blogValidators, createBlogController); // Создание сетевого журнала
blogsRout.delete("/:id", findBlogValidator, adminMiddleware,  delBlogController); // Удаление сетевого журнала
blogsRout.put("/:id", findBlogValidator, ...blogValidators, putBlogController); // Изменение сетевого журнала

blogsRout.get("/:id/posts", findBlogValidator, queryGetMiddleware, getPostsController); // Возврат записей для указанного сетевого журнала
blogsRout.post("/:id/posts", findBlogValidator, ...postValWithoutBID, createPostController); // Создание записи для указанного сетевого журнала
