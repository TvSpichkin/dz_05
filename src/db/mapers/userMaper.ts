import {UserDbType} from "../types/usersDbTypes";
import {UserViewModel} from "../../routes/users/types/usersTypes";


export function userMaper(user: UserDbType): UserViewModel {
    return {
        id: String(user.id),
        login: user.userName,
        email: user.email,
        createdAt: new Date(user.createdAt).toISOString()
    };
} // Конвертация пользователей из БД в модельный вид
