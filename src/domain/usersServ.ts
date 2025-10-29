import {UserInputModel, userFields} from "../present/routes/users/types/usersTypes";
import {DomResObj} from "./types/resObjType";
import {UserDbType, userDbFields} from "../db/types/usersDbTypes";
import {usersRepDB} from "../db/repository/users/usersRepDB";
import {getSomePFilt} from "../tools/methodPFilt";
import {genSalt} from "./tools/methodsCrypt";
import bcrypt from "bcrypt";
import {LoginInputModel} from "../present/routes/auth/types/authTypes";


export const usersServ = {
    async create(user: UserInputModel): Promise<DomResObj<UserDbType>> {
        const findUser = await usersRepDB.readByPF(getSomePFilt(
            [userDbFields.login, user.login], // Проверка уникальности для имени пользователя
            [userDbFields.email, user.email] // Проверка уникальности для адреса электронной почты
        )); // Поиск пользователя по текущей паре значений
        
        if(findUser) return {
            isSuccess: false,
            errField: user.email == findUser.email ? userFields.email : userFields.login
        }; // Возврат ошибки и неуникального поля в случае совпадения
        
        const saltPW = await genSalt(10), // Генерация соли для контрольной суммы пароля
        hashPW = await bcrypt.hash(user.password, saltPW), // Генерация контрольной суммы пароля
        newUser: UserDbType = {
            id: 0,
            userName: user.login,
            email: user.email,
            passwordHash: hashPW,
            passwordSalt: saltPW,
            createdAt: new Date().getTime()
        };
        
        newUser.id = (await usersRepDB.write(newUser));
        
        return {isSuccess: true, ent: newUser};
    }, // Создание пользователя
    async del(id: number): Promise<boolean> {
        return usersRepDB.remove(id);
    }, // Удаление пользователя
    async checkCredentials(auth: LoginInputModel): Promise<boolean> {
        const findUser = await usersRepDB.readByPF(getSomePFilt([
            auth.loginOrEmail.includes('@') ? userDbFields.email : userDbFields.login, auth.loginOrEmail
        ])); // Поиск по имени пользователя или адресу электронной почты
        
        if(!findUser) return false;
        const hashPW = await bcrypt.hash(auth.password, findUser.passwordSalt); // Генерация контрольной суммы пароля
        
        return hashPW == findUser.passwordHash;
    } // Проверка учетных данных пользователя
}; // Изменение пользователей
