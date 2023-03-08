import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private readonly userLoginData = new Map();

    use(req: Request, res: Response, next: NextFunction) {

        // รับข้อมูลการเข้าสู่ระบบของผู้ใช้
        const username = req.body.username;
        const userLoginData = this.userLoginData.get(username);

        // ตรวจสอบว่าผู้ใช้พยายามเข้าสู่ระบบเกินจำนวนครั้งสูงสุดหรือไม่
        const MAX_LOGIN_ATTEMPTS = 3;
        const LOGIN_ATTEMPTS_TIMEOUT = 30000; // มิลลิวินาที
        const now = Date.now();

        // ?. ซึ่งจะทำให้โค้ดไม่ error ในกรณีที่ userLoginData เป็น undefined หรือ null โดยการใช้ ?. นี้จะทำการตรวจสอบว่า object นั้นมี property ที่ต้องการอยู่หรือไม่ ถ้าไม่มีก็จะส่งค่า undefined กลับมาโดยไม่ทำให้โค้ด error 
        if (userLoginData?.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
            if (now - userLoginData.lastAttempt <= LOGIN_ATTEMPTS_TIMEOUT) {
                const timeToUnlock = Math.ceil((LOGIN_ATTEMPTS_TIMEOUT - (now - userLoginData.lastAttempt)) / 1000);
                return res.status(429).send({ message: `พยายามเข้าสู่ระบบมากเกินไป โปรดรอ ${timeToUnlock} วินาทีแล้วลองอีกครั้งในภายหลัง` });
            }
            this.userLoginData.set(username, {
                loginAttempts: 0,
                lastAttempt: now,
            });
            return res.status(429).send({ message: `พยายามเข้าสู่ระบบมากเกินไป โปรดรอสักครู่แล้วลองอีกครั้งในภายหลัง` });
        }

        // อัปเดตข้อมูลการเข้าสู่ระบบของผู้ใช้
        const updatedUserLoginData = {
            loginAttempts: userLoginData?.loginAttempts + 1 || 1,
            lastAttempt: now,
        };
        this.userLoginData.set(username, updatedUserLoginData);
        next();
    }
}
