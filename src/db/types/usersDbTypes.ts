export type UserDbType = {
    id: number, // Идентификатор
    userName: string, // Имя пользователя; максимальная длина: 10, минимальная длина: 3, шаблон: ^[a-zA-Z0-9_-]*$, должен быть уникальным
    email: string, // Почта; шаблон: ^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$, должна быть уникальной
    passwordHash: string, // Контрольная сумма пароля
    passwordSalt: string, // Соль пароля
    createdAt: number // Дата создания
}; // Тип пользователя в БД

export enum userDbFields {
    id = "id", // Идентификатор
    userName = "userName", // Вход; максимальная длина: 10, минимальная длина: 3, шаблон: ^[a-zA-Z0-9_-]*$, должен быть уникальным
    email = "email", // Почта; шаблон: ^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$, должна быть уникальной
    passwordHash = "passwordHash", // Контрольная сумма пароля
    passwordSalt = "passwordSalt", // Соль пароля
    createdAt = "createdAt" // Дата создания
}; // Возможные поля пользователя в БД
