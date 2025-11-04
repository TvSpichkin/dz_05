import {SET} from "../../settings";
import bcrypt from "bcrypt";


export async function genSalt(r: number = SET.NumberOfRounds): Promise<string> {
    return (await bcrypt.genSalt(r)).slice(7); // Выдача чистой соли
} // Генерация соли

export async function genHash(d: string | Buffer<ArrayBufferLike>, s: string): Promise<string> {
    const r = SET.NumberOfRounds; // Количество раундов
    
    s = "$2b$" + (r > 9 ? '' : 0) + r + '$' + s; // Подготовка соли для криптографии Рыбы-иглу
    
    return (await bcrypt.hash(d, s)).slice(29); // Выдача чистой контрольной суммы
} // Генерация контрольной суммы
