import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import JWT, { JwtPayload } from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

export const Auth = {
    private: async (req: Request, res: Response, next: NextFunction) => {
        let success = false;

        //Fazer verificação de auth
        if (req.headers.authorization) {
          
            let hash: string = req.headers.authorization.substring(6);
            let decoded: string = Buffer.from(hash, 'base64').toString();
            let data: string[] = decoded.split(':');

            if(data.length === 2){
                let hasUser = await User.findOne({
                    where: {
                        email: data[0],
                        password: data[1]
                    }
                });

                if (hasUser) {
                    success = true;   
                }
            }
        }

        if (success) {
            next();
        } else {
            res.status(403); // Not authorized
            res.json({ error: 'Não autorizado' });
        }
    },

    validate: async (req: Request, res: Response, next: NextFunction) => {
        let success = false;

        //Fazer verificação de auth
        if (req.headers.authorization) {
          
            let [tokenType, token]  = req.headers.authorization.split(' ');
            
            try {

                if(tokenType.toLowerCase() === 'bearer'){

                    let  payload = JWT.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayloadCustomized | any ; 
                 
                     let hasUser = await User.findOne({
                        where: {
                            email: payload?.email,
                            id: payload?.id
                        }
                    }); 
    
                    if (hasUser) {
                        success = true;   
                    }
                }

            } catch (error) {
                console.log({error: 'Deu erro ao validar o token.'});
            }
            

        }

        if (success) {
            next();
        } else {
            res.status(403); // Not authorized
            res.json({ error: 'Não autorizado' });
        }
    }
}

type JwtPayloadCustomized = {
        email: string;
        id: number;
        iat: number;
        exp: number;
}