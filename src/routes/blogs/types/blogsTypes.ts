export type BlogIdModel = {
    /**
     * Идентификатор существующего сетевого журнала
     */
    id: string
};

export type BlogInputModel = {
    name: string, // Имя; максимальная длина: 15
    description: string, // Описание; максимальная длина: 500
    websiteUrl: string // ЕУР сетевого узла; максимальная длина: 100, шаблон: ^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$
}; // Входная модель сетевого журнала

export type BlogViewModel = {
    id: string, // Идентификатор
    name: string, // Имя; максимальная длина: 15
    description: string, // Описание; максимальная длина: 500
    websiteUrl: string, // ЕУР сетевого узла; максимальная длина: 100, шаблон: ^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$
    createdAt: string, // Строка даты создания
    isMembership: boolean // Подписка на членство в сетевом журнале
}; // Выходная модель сетевого журнала

export enum blogFields {
    id = "id", // Идентификатор
    name = "name", // Имя; максимальная длина: 15
    description = "description", // Описание; максимальная длина: 500
    websiteUrl = "websiteUrl", // ЕУМР сетевого узла; максимальная длина: 100, шаблон: ^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$
    createdAt = "createdAt", // Дата создания
    isMembership = "isMembership" // Подписка на членство в сетевом журнале
}; // Возможные поля сетевого журнала

export type TypeBlogFields = keyof typeof blogFields;
