using Microsoft.AspNetCore.Mvc;
using ShowcaseAPI.Models;
using System.Net.Mail;
using System.Net;
// Looking to send emails in production? Check out our Email API/SMTP product!
using System.Net;
using System.Net.Mail;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ShowcaseAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MailController : ControllerBase
    {
        // POST api/<MailController>
        [HttpPost]
        public ActionResult Post([Bind("FirstName, LastName, Email, Phone")] Contactform form)
        {
            //Op brightspace staan instructies over hoe je de mailfunctionaliteit werkend kunt maken:
            //Project Web Development > De showcase > Week 2: contactpagina (UC2) > Hoe verstuur je een mail vanuit je webapplicatie met Mailtrap?



            var client = new SmtpClient("sandbox.smtp.mailtrap.io", 2525)
            {
                Credentials = new NetworkCredential("ab6bf5befc4a02", "********c303"),
                EnableSsl = true
            };
            client.Send("from@example.com", "to@example.com", "Hello world", "testbody");
            System.Console.WriteLine("Sent");

            return Ok();
        }
    }
}
