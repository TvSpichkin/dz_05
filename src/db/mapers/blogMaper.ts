import {BlogDbType} from "../repository/types/blogsDbTypes";
import {BlogViewModel} from "../../routes/blogs/types/blogsTypes";


export function blogMaper(blog: BlogDbType): BlogViewModel {
    return {
        id: String(blog.id),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: new Date(blog.createdAt).toISOString(),
        isMembership: blog.isMembership
    };
} // Конвертация сетевых журналов из БД в модельный вид
