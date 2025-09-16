import {db} from "../../db";
import {DBType} from "../types/typesRepDB";
import {BlogDbType} from "../types/blogsDbTypes";
import {PostDbType} from "../types/postsDbTypes";


export async function setDB(dataset?: DBType) {
    await db.collection<BlogDbType>("blogs").drop(); // Отчистка массива сетевых журналов
    await db.collection<PostDbType>("posts").drop(); // Отчистка массива записей
    // Если в функцию ничего не передано - то очищаем базу данных
    if(dataset) { // Если что-то передано - то заменяем старые значения новыми
        if(dataset.blogs.length) await db.collection<BlogDbType>("blogs").insertMany(dataset.blogs);
        if(dataset.posts.length) await db.collection<PostDbType>("posts").insertMany(dataset.posts);
    }
} // Функция перезаписи БД
