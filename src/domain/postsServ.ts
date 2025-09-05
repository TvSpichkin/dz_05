import {PostInputModel} from "../routes/posts/types/postsTypes";
import {PostDbType, PostDbPutType} from "../db/repository/types/postsDbTypes";
import {postsRepDB} from "../db/repository/posts/postsRepDB";


export const postsServ = {
    async create(post: PostInputModel): Promise<PostDbType> {
        const newPost: PostDbType = {
            id: 0,
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: +post.blogId,
            createdAt: new Date().getTime()
        };
        
        newPost.id = (await postsRepDB.write(newPost));
        
        return newPost;
    }, // Создание записи
    async del(id: number): Promise<boolean> {
        const isExist = await postsRepDB.check(id);
        
        if(isExist) await postsRepDB.remove(id);
        
        return isExist;
    }, // Удаление записи
    async put(post: PostInputModel, id: number): Promise<boolean> {
        const isExist = await postsRepDB.check(id),
        putPost: PostDbPutType = {
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: +post.blogId
        };
        
        if(isExist) await postsRepDB.edit(putPost, id);
        
        return isExist;
    } // Обновление данных записи
}; // Изменение записей
