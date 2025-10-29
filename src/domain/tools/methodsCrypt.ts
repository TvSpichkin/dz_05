import bcrypt from "bcrypt";


export async function genSalt(r?: number): Promise<string> {
    return bcrypt.genSalt(r);
} // Генерация соли
