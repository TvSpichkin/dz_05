import {PostDbTypeA} from "../types/postsDbTypes";
import {PostViewModel} from "../../routes/posts/types/postsTypes";


export function postMaper(post: PostDbTypeA): PostViewModel {
    return {
        id: String(post.id),
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: String(post.blogId),
        blogName: post.blogName,
        createdAt: new Date(post.createdAt).toISOString()
    };
} // Конвертация агрегированных записей из БД в модельный вид
