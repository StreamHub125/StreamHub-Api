import Nodemailer, { Transporter } from "nodemailer";
import DotEnv from "dotenv";
import { Logger } from "../../utils/Logger";
import { EnumColorLogger } from "../../types.enum";
import { SendEmailInfoReturn } from "../../types";

DotEnv.config();
export class NodemailerService {
  private static instance: NodemailerService | null = null;
  private transporter: Transporter<SendEmailInfoReturn>;
  private logger: Logger;
  protected readonly date: Date;

  private constructor() {
    this.logger = new Logger(EnumColorLogger.FgCyan, "NodeMailer-Service");
    this.date = new Date();
    this.transporter = Nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_AUTH_EMAIL,
        pass: process.env.GMAIL_AUTH_PASSWORD,
      },
    });

    this.transporter
      .verify()
      .then(() => {
        this.logger.Log("Node Mailer Active");
      })
      .catch((error) => {
        this.logger.Log(`Error to active Node Mailer ${JSON.stringify(error)}`);
      });
  }

  async sendMail(subject: string, emails: string[]) {
    let to = "";
    emails.forEach((ed) => {
      if (to === "") {
        to = ed;
      } else {
        to = to + ", " + ed;
      }
    });

    // Podemos enviar text o html `text: "Hello world?"`, // plain text body
    const info = await this.transporter.sendMail({
      from: `"${subject}" <${process.env.GMAIL_AUTH_EMAIL}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      html: "<b>Hello world?</b>", // html body
    });

    /**
     * Info MuckUp
     * info: {
            accepted: [ 'dscampaz3110@gmail.com', 'clanclskn@gcac.com' ],
            rejected: [],
            ehlo: [
            'SIZE 35882577',
            '8BITMIME',
            'AUTH LOGIN PLAIN XOAUTH2 PLAIN-CLIENTTOKEN OAUTHBEARER XOAUTH',
            'ENHANCEDSTATUSCODES',
            'PIPELINING',
            'CHUNKING',
            'SMTPUTF8'
            ],
            envelopeTime: 536,
            messageTime: 682,
            messageSize: 407,
            response: '250 2.0.0 OK  1690517236 x6-20020a05610223c600b004451f8ccf1csm418782vsr.11 - gsmtp',
            envelope: { from: 'streamhub.con.fn@gmail.com', to: [Array] },
            messageId: '<5a52b10e-9388-dcc1-055e-f9e26b10a57c@gmail.com>'
        }
     */
    this.sendInternalMailRejectMail(info.rejected);
  }

  async sendInternalMail(subject: string) {
    await this.transporter.sendMail({
      from: `"${subject}" <${process.env.GMAIL_AUTH_EMAIL}>`, // sender address
      to: process.env.INTERNAL_EMAIL_NOTIFICATION, // list of receivers
      subject, // Subject line
      html: "<b>Hello world?</b>", // html body
    });
  }

  private async sendInternalMailRejectMail(emails: any[]) {
    if (emails.length === 0 || emails.length < 0) {
      return;
    }
    let eemails = "";
    emails.forEach((ed) => {
      const edss = this.createHtmlFromEmailLinks(ed);
      if (eemails === "") {
        eemails = edss;
      } else {
        eemails = eemails + ", " + edss;
      }
    });
    // Podemos enviar la info del reject
    await this.transporter.sendMail({
      from: `Emails Reject in ${this.date.toLocaleDateString()} ${this.date.toLocaleTimeString()} <${
        process.env.GMAIL_AUTH_EMAIL
      }>`, // sender address
      to: process.env.INTERNAL_EMAIL_NOTIFICATION, // list of receivers
      subject: `Emails Reject in ${this.date.toLocaleDateString()} ${this.date.toLocaleTimeString()}`, // Subject line
      html: `<b>Organizar HTMl ${eemails}</b>`, // html body
    });
  }

  private createHtmlFromEmailLinks(email: string): string {
    return `<a href="#">${email}</a>`;
  }

  static Instance(): NodemailerService {
    if (this.instance === null) {
      this.instance = new NodemailerService();
    }

    return this.instance;
  }
}
