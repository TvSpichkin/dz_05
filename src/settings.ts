import {config} from "dotenv";
config(); // добавление переменных из файла .env в process.env


export const SET = {
    PORT: process.env.PORT || 3e3, // Порт, прослушиваемый сервером
    //IP: "127.0.0.1", // Адрес межсетевого протокола (МП)
    PATH: {
        AUTH: "/auth/login",
        BLOGS: "/blogs",
        POSTS: "/posts",
        TESTING: "/testing",
        USERS: "/users"
    }, // Пути ресурсов
    ADMIN: process.env.ADMIN || "admin:qwerty", // Логин и пароль для авторизации
    NumberOfRounds: 10, // Стоимость обработки данных при получении контрольной суммы с солью
    MongoURI: process.env.MongoURI || "mongodb://127.0.0.1:27017" // ЕИР строка подключения к монгоБД
}; // Определение частоиспользуемых констант
