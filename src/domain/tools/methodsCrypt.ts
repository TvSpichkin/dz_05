import bcrypt from "bcrypt";


export async function genSalt(r?: number): Promise<string> {
    return bcrypt.genSalt(r);
} // Генерация соли

export async function genHash(d: string | Buffer<ArrayBufferLike>, s: string): Promise<string> {
    return bcrypt.hash(d, s);
} // Генерация контрольной суммы
