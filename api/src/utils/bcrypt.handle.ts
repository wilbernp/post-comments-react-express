import bcrypt from "bcrypt"

export default {
    encrypt: async (plainText: string) => {
        return await bcrypt.hash(plainText, Number(process.env.BCRYPT_SALT))
    },
    compare: async (plainText: string, encryptText:string) => {
        return await bcrypt.compare(plainText, encryptText)
    }
} 
