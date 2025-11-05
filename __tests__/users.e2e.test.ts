import {UserViewModel} from "../src/present/routes/users/types/usersTypes";
import {runDB, stopDB} from "../src/db/db";
import {setDB} from "../src/db/repository/testing/setDB";
import {req, getUser, pageData} from "./helpers/test-helpers";
import {SET} from "../src/settings";


describe("/users", () => {
    var user1: UserViewModel, user2: UserViewModel;
    
    beforeAll(async () => {
        await runDB(); // Подключение к БД
        await setDB(); // Очистка базы данных перед началом тестирования
    });
    afterAll(async () => {
        await stopDB(); // Отключение от БД
    });
    
    it("должен вернуть 401 без авторизации", async () => {
        await req.get(SET.PATH.USERS).expect(401);
        await req.get(SET.PATH.USERS).set({"Auth": "Basic cisaB"}).expect(401);
        await req.get(SET.PATH.USERS).set({"Authorization": "Vazic cisaB"}).expect(401);
        await req.get(SET.PATH.USERS).set({"Authorization": "Basic cisaB"}).expect(401);
    });
    
    it("должен вернуть 200 и пустой массив", async () => {
        await getUser.expect(200, pageData());
    });
});
