import { Request, Response } from 'express';
import nodemailer from "nodemailer";


export const ping = (req: Request, res: Response) => {
    res.json({pong: true});
}

export const contato = async (req: Request, res: Response) => {
    //Passo 1: Configurar o transporter (servidor smtp)
    let transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "87954a7e2ac8a1",
          pass: "10f584af225dd5"
        }
      });

    //Passo 2: Configurar a mensagem
      let message = {
        from: 'Setonde Nougbodohoue <touscool10@gmail.com>',
        to: 'teste@hotmail.com',
        subject: 'Assunto legal',
        html: 'Opa <strong>Teste</strong>, como vai?',
        text: 'Opa Teste, como vai?'
      }

    //Passo 1: Enviar a mensagem
    let info = await transport.sendMail(message);
    
    console.log("Info: ", info);

    res.json({success: true});
}


