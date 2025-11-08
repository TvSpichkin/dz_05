import {UserViewModel} from "../src/present/routes/users/types/usersTypes";
import {runDB, stopDB} from "../src/db/db";
import {setDB} from "../src/db/repository/testing/setDB";
import {req, getUser, pageData} from "./helpers/test-helpers";
import {SET} from "../src/settings";
import {auth, bigStr, corrUser1, corrUser2, corrUser3} from "./helpers/datasets";


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
    
    it("не должен создать пользователя без авторизации и должен вернуть 401", async () => {
        await req.post(SET.PATH.USERS).send(corrUser1).expect(401);
        await req.post(SET.PATH.USERS).set({"Auth": "Basic cisaB"}).send(corrUser1).expect(401);
        await req.post(SET.PATH.USERS).set({"Authorization": "Vazic cisaB"}).send(corrUser1).expect(401);
        await req.post(SET.PATH.USERS).set({"Authorization": "Basic cisaB"}).send(corrUser1).expect(401);
        await getUser.expect(200, pageData());
    });
    
    it("не должен создать пользователя c неправильными входными данными", async () => {
        const user = corrUser1;
        
        await req.post(SET.PATH.USERS).set(auth).expect(400);
        await getUser.expect(200, pageData());
        
        await req.post(SET.PATH.USERS).set(auth).send().expect(400);
        await getUser.expect(200, pageData());
        
        await req.post(SET.PATH.USERS).set(auth).send({название: 0}).expect(400);
        await getUser.expect(200, pageData());
        
        await req.post(SET.PATH.USERS).set(auth).send({...user, login: undefined}).expect(400);
        await req.post(SET.PATH.USERS).set(auth).send({...user, login: 0}).expect(400);
        await req.post(SET.PATH.USERS).set(auth).send({...user, login: bigStr(7)}).expect(400);
        await req.post(SET.PATH.USERS).set(auth).send({...user, login: bigStr(11, 1)}).expect(400);
        await req.post(SET.PATH.USERS).set(auth).send({...user, login: bigStr(2, 1)}).expect(400);
        await req.post(SET.PATH.USERS).set(auth).send({...user, login: "    "}).expect(400);
        await getUser.expect(200, pageData());
        
        await req.post(SET.PATH.USERS).set(auth).send({...user, password: undefined}).expect(400);
        await req.post(SET.PATH.USERS).set(auth).send({...user, password: 0}).expect(400);
        await req.post(SET.PATH.USERS).set(auth).send({...user, password: bigStr(21)}).expect(400);
        await req.post(SET.PATH.USERS).set(auth).send({...user, password: bigStr(5)}).expect(400);
        await req.post(SET.PATH.USERS).set(auth).send({...user, password: "        "}).expect(400);
        await getUser.expect(200, pageData());
        
        await req.post(SET.PATH.USERS).set(auth).send({...user, email: undefined}).expect(400);
        await req.post(SET.PATH.USERS).set(auth).send({...user, email: 0}).expect(400);
        await req.post(SET.PATH.USERS).set(auth).send({...user, email: bigStr(7)}).expect(400);
        await req.post(SET.PATH.USERS).set(auth).send({...user, email: bigStr(7, 1)}).expect(400);
        await req.post(SET.PATH.USERS).set(auth).send({...user, email: "        "}).expect(400); 
        await req.post(SET.PATH.USERS).set(auth).send({...user, email: "ё@e.fg"}).expect(400);
        await req.post(SET.PATH.USERS).set(auth).send({...user, email: "d@ё.fg"}).expect(400);
        await req.post(SET.PATH.USERS).set(auth).send({...user, email: "d@e.ёg"}).expect(400);
        await req.post(SET.PATH.USERS).set(auth).send({...user, email: "d@e.f"}).expect(400);
        await req.post(SET.PATH.USERS).set(auth).send({...user, email: "d@e.fghij"}).expect(400);
        await req.post(SET.PATH.USERS).set(auth).send({...user, email: "de.fg"}).expect(400);
        await req.post(SET.PATH.USERS).set(auth).send({...user, email: "d@efg"}).expect(400);
        await getUser.expect(200, pageData());
    });
});
