using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Net.Mail;

namespace TemplateMongo.Services
{
    public class MailMsgService
    {
        public MailMsgService()
        {
            
        }

        public void sendMail()
        {
            var fromAddress = new MailAddress("amitay103@walla.co.il", "Amitay");
            var toAddress = new MailAddress("amitaybohadana@gmail.com", "Amitay2");
            const string fromPassword = "199223";
            const string subject = "רכב - 48045044";
            const string body = "גוף העבודה";

            SmtpClient smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = true,

                Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
            };
            using (var message = new MailMessage(fromAddress, toAddress)
            {
                Subject = subject,
                Body = body
            })
            {
                smtp.Send(message);
            }

        }
    }

        
}

