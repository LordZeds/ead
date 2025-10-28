import bcrypt from 'bcrypt';
const rounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);
export async function hashPassword(password: string){return bcrypt.hash(password, rounds);}export async function verifyPassword(password: string, hash: string){return bcrypt.compare(password, hash);}
