import {fromUTF8ToBase64} from "../../src/middlewares/global/adminMiddleware";
import {SET} from "../../src/settings";
import {BlogInputModel} from "../../src/present/routes/blogs/types/blogsTypes";
import {PostInputModel} from "../../src/present/routes/posts/types/postsTypes";
import {UserInputModel} from "../../src/present/routes/users/types/usersTypes";
import {BlogDbType} from "../../src/db/types/blogsDbTypes";
import {PostDbType} from "../../src/db/types/postsDbTypes";
import {UserDbType} from "../../src/db/types/usersDbTypes";
import {DBType} from "../../src/db/types/typesRepDB";
import {genSalt, genHash} from "../../src/domain/tools/methodsCrypt";


export const auth = {"Authorization": "Basic " + fromUTF8ToBase64(SET.ADMIN)}; // Получение base64 строки авторизации

export const corrBlog1 = createBlog("Василий", "Тёркин", "https://_vas-i1.t_9r/k_/-i/4/"),
    corrBlog2 = createBlog("Максим", "Так так так", "https://maksima.dva/teski"),
    corrBlog3 = createBlog(bigStr(15), bigStr(500), "https://te.st"), // Правильные входные сетевые журналы
    corrPost1 = createPost("Название 1 записи", "Краткое описание 1 записи", "Содержание 1 записи", '1'),
    corrPost2 = createPost("Название 2 записи", "Краткое описание 2 записи", "Содержание 2 записи", '1'),
    corrPost3 = createPost(bigStr(30), bigStr(100), bigStr(1000), '2'), // Правильные входные записи
    corrUser1 = createUser("Mihal", "Палыч Тереньтьев", "kapital@projit.min"),
    corrUser2 = createUser("Abc", bigStr(6), "d@e.fg"), // Правильные входные пользователи
    corrUser3 = createUser("Hijklmnopq", bigStr(20), bigStr(124, 1) + '@' + bigStr(124, 1) + ".rstu");

function createBlog(n: string, d: string, w: string): BlogInputModel {
    return {
        name: n, // Имя; максимальная длина: 15
        description: d, // Описание; максимальная длина: 500
        websiteUrl: w // ЕУР сетевого узла; максимальная длина: 100, шаблон: ^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$
    };
} // Создание входного сетевого журнала

function createPost(t: string, s: string, c: string, b: string): PostInputModel {
    return {
        title: t, // Название; максимальная длина: 30
        shortDescription: s, // Краткое описание; максимальная длина: 100
        content: c, // Содержание; максимальная длина: 1000
        blogId: b // Идентификатор существующего сетевого журнала
    };
} // Создание входной записи

function createUser(l: string, p: string, e: string): UserInputModel {
    return {
        login: l, // Вход; максимальная длина: 10, минимальная длина: 3, шаблон: ^[a-zA-Z0-9_-]*$, должен быть уникальным
        password: p, // Пароль; максимальная длина: 20, минимальная длина: 6
        email: e // Почта; шаблон: ^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$, должна быть уникальной
    };
} // Создание входного пользователя

function getPosChar(i: number, e: number): number {
    if(!e) return 33 + (i < 94 ? i : i + 33); // Возвращение позиции из символов юникода
    
    i %= 64; // Возвращение позиции для шаблона: ^[\w-]*$
    if(!i) return 45;
    if(i < 11) return 47 + i;
    if(i < 37) return 54 + i;
    if(i < 38) return 95;
    return 59 + i;
} // Получение позиции символа

export function bigStr(n: number, e = 0): string {
    var t = "";
    
    for(let i = 0; i < n; i++) t += String.fromCharCode(getPosChar(i, e));
    
    return t;
} // Создание строки с длиной n из символов юникода

function createBlogBD(i: number): BlogDbType {
    return {
        id: i, // Идентификатор
        name: "Имя " + i, // Имя; максимальная длина: 15
        description: "Описание " + i, // Описание; максимальная длина: 500
        websiteUrl: "https://web.site/URL/" + i, // ЕУМР сетевого узла; максимальная длина: 100, шаблон: ^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$
        createdAt: new Date().getTime() + i - 1, // Дата создания
        isMembership: false // Подписка на членство в сетевом журнале
    };
} // Создание сетевого журнала для БД

function createPostBD(i: number, b: number): PostDbType {
    return {
        id: i, // Идентификатор
        title: "Название " + i, // Название; максимальная длина: 30
        shortDescription: "Краткое описание " + i, // Краткое описание; максимальная длина: 100
        content: "Содержание " + i, // Содержание; максимальная длина: 1000
        blogId: (i - 1)%b + 1, // Идентификатор существующего сетевого журнала
        createdAt: new Date().getTime() + i - 1 // Дата создания
    };
} // Создание сетевого журнала для БД

async function createUserBD(i: number): Promise<UserDbType> {
    const s = await genSalt();
    
    return {
        id: i, // Идентификатор
        userName: "Name" + i, // Имя пользователя; максимальная длина: 10, минимальная длина: 3, шаблон: ^[a-zA-Z0-9_-]*$, должен быть уникальным
        email: "address" + i + "@email.web.site", // Почта; шаблон: ^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$, должна быть уникальной
        passwordHash: await genHash("Пароль " + i, s), // Контрольная сумма пароля
        passwordSalt: s, // Соль пароля
        createdAt: new Date().getTime() + i - 1 // Дата создания
    };
} // Создание пользователя для БД

export async function createDataSet(b: number, p: number = 0): Promise<DBType> {
    const dataset: DBType = {
        blogs: [], // Массив сетевых журналов
        posts: [], // Массив записей
        users: [] // Массив пользователей
    }; // Значения заполнения БД
    var i: number;
    
    for(i = 1; i <= b; i++) dataset.blogs.push(createBlogBD(i));
    for(i = 1; i <= p; i++) dataset.posts.push(createPostBD(i, b));
    for(i = 1; i <= b; i++) dataset.users.push(await createUserBD(i));
    
    return dataset;
} // Создание набора данных
