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
        [HttpPost]
        public ActionResult Post([Bind("FirstName, LastName, Email, Phone, Subject, Description")] Contactform form)
        {
            try
            {
                var client = new SmtpClient("sandbox.smtp.mailtrap.io", 2525)
                {
                    Credentials = new NetworkCredential("ab6bf5befc4a02", "3ad7fd5780c303"),
                    EnableSsl = true
                };

                var mailMessage = new MailMessage
                {
                    From = new MailAddress(form.Email),
                    Subject = form.Subject,
                    Body = $"Naam: {form.FirstName} {form.LastName}\n" +
                           $"E-mail: {form.Email}\n" +
                           $"Telefoon: {form.Phone}\n\n" +
                           $"Onderwerp: {form.Subject} \n" +
                           $"Omschrijving: {form.Description}", 
                    IsBodyHtml = false 
                };

                mailMessage.To.Add("to@example.com");

                client.Send(mailMessage);

                System.Console.WriteLine("E-mail succesvol verzonden!");
                return Ok();
            }
            catch (Exception ex)
            {
                System.Console.WriteLine($"Er is een fout opgetreden bij het verzenden van de e-mail: {ex.Message}");
                return StatusCode(500, "Er ging iets mis bij het verzenden van de e-mail.");
            }
        }
    }
}

