import {BlogInputModel} from "../routes/blogs/types/blogsTypes";
import {BlogDbType, BlogDbPutType} from "../db/repository/types/blogsDbTypes";
import {blogsRepDB} from "../db/repository/blogs/blogsRepDB";


export const blogsServ = {
    async create(blog: BlogInputModel): Promise<BlogDbType> {
        const newBlog: BlogDbType = {
            id: 0,
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: new Date().getTime(),
            isMembership: false
        };
        
        newBlog.id = (await blogsRepDB.write(newBlog));
        
        return newBlog;
    }, // Создание сетевого журнала
    async del(id: string) {
        //await repBD.remove("posts", "blogId", +id);
        await blogsRepDB.remove(+id);
    }, // Удаление сетевого журнала и всех его записей
}; // Изменение сетевых журналов
