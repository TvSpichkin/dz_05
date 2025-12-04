import {agent} from "supertest";
import {app} from "../../src/app";
import {SET} from "../../src/settings";
import {auth} from "./datasets";
import {Paginator} from "../../src/present/tools/paginator";


export const req = agent(app), // Определение запроса для тестирования программы
    getBlog = req.get(SET.PATH.BLOGS), // Запрос на получение всех сетевых журналов
    getPost = req.get(SET.PATH.POSTS), // Запрос на получение всех записей
    getUser = req.get(SET.PATH.USERS).set(auth); // Запрос на получение всех пользователей

export function queryBlog(q: string = ""): typeof getBlog {
    return req.get(SET.PATH.BLOGS + "?" + q);
} // Запрос на получение всех сетевых журналов с вопросом

export function queryPost(q: string = ""): typeof getPost {
    return req.get(SET.PATH.POSTS + "?" + q);
} // Запрос на получение всех записей с вопросом

export function queryUser(q: string = ""): typeof getUser {
    return req.get(SET.PATH.USERS + "?" + q).set(auth);
} // Запрос на получение всех пользователей с вопросом

export function pageData<T>(i: T[] = [], p: number = 1, ps: number = 10, tc: number = i.length): Paginator<T> {
    return {
        pagesCount: Math.ceil(tc/ps), // Количество страниц
        page: p, // Номер текущей страницы
        pageSize: ps, // Размер страницы - количество элементов на одной странице
        totalCount: tc, // Количество элементов
        items: i // Нужная порция сущностей
    };
} // Данные страницы
