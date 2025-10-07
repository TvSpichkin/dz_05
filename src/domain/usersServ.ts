import {UserInputModel, userFields} from "../routes/users/types/usersTypes";
import {UserDbType, userDbFields} from "../db/types/usersDbTypes";
import {ProtoFilterType} from "../db/types/typesRepDB";
import {usersRepDB} from "../db/repository/users/usersRepDB";


export const usersServ = {
    async create(user: UserInputModel): Promise<UserDbType> {
        const findUser = await usersRepDB.readByPF([
            {key: userDbFields.login, value: user.login, way: 0}, // Проверка уникальности для имени пользователя
            {key: userDbFields.email, value: user.email, way: 0} // Проверка уникальности для адреса электронной почты
        ]); // Поиск пользователя по текущей паре значений
        
        // if(findUser) return {};
        
        const newUser: UserDbType = {
            id: 0,
            userName: user.login,
            email: user.email,
            passwordHash: "",
            passwordSalt: "",
            createdAt: new Date().getTime()
        };
        
        newUser.id = (await usersRepDB.write(newUser));
        
        return newUser;
    }, // Создание пользователя
    async del(id: number): Promise<boolean> {
        const isExist = await usersRepDB.check(id);
        
        if(isExist) await usersRepDB.remove(id);
        
        return isExist;
    } // Удаление пользователя
}; // Изменение пользователей
