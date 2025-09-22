export const SetLen = {
    Max: {
        BLOG: {
            NAME: 15,
            DESCRIPTION: 500,
            WebsiteUrl: 100
        },
        POST: {
            TITLE: 30,
            ShortDescription: 100,
            CONTENT: 1000
        },
        USER: {
            LOGIN: 10,
            PASSWORD: 20,
            EMAIL: 254
        },
        QUERY: {
            PageSize: 100
        }
    }, // Максимальные длины для строк
    Min: {
        BLOG: {
            NAME: 1,
            DESCRIPTION: 1,
            WebsiteUrl: 1
        },
        POST: {
            TITLE: 1,
            ShortDescription: 1,
            CONTENT: 1
        },
        USER: {
            LOGIN: 3,
            PASSWORD: 6,
            EMAIL: 6
        }
    } // Минимальные длины для строк
}; // Определение частоиспользуемых длин
