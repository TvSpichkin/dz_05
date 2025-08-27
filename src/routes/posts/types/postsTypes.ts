export type PostIdModel = {
    /**
     * Идентификатор существующей записи
     */
    id: string
};

export type PostInputModel = {
    title: string, // Название; максимальная длина: 30
    shortDescription: string, // Краткое описание; максимальная длина: 100
    content: string, // Содержание; максимальная длина: 1000
    blogId: string // Идентификатор существующего сетевого журнала
}; // Входная модель записи

export type PostViewModel = {
    id: string, // Идентификатор
    title: string, // Название; максимальная длина: 30
    shortDescription: string, // Краткое описание; максимальная длина: 100
    content: string, // Содержание; максимальная длина: 1000
    blogId: string, // Идентификатор существующего сетевого журнала
    blogName: string, // Имя соответствующего сетевого журнала
    createdAt: string // Строка даты создания
}; // Выходная модель записи

export enum postFields {
    id = "id", // Идентификатор
    title = "title", // Название; максимальная длина: 30
    shortDescription = "shortDescription", // Краткое описание; максимальная длина: 100
    content = "content", // Содержание; максимальная длина: 1000
    blogId = "blogId", // Идентификатор существующего сетевого журнала
    blogName = "blogName", // Имя существующего сетевого журнала; максимальная длина: 15
    createdAt = "createdAt" // Дата создания
}; // Возможные поля записи

export type TypePostFields = keyof typeof postFields; // Тип возможных полей записи
