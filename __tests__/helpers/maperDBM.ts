import {DBType} from "../../src/db/types/typesRepDB";
import {PostViewModel} from "../../src/present/routes/posts/types/postsTypes";
import {postMaper} from "../../src/db/mapers/postMaper";


export const maperDBM = {
    posts(dbm: DBType): PostViewModel[] {
        return dbm.posts.map(p => ({...p, blogName: dbm.blogs.find(b => b.id == p.blogId)!.name})).map(postMaper);
    } // Метод для записей
}; // Конвертация всех сущностей из ОЗУ БД в модельный вид
