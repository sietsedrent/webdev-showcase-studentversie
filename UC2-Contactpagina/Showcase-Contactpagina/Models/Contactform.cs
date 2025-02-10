using System.ComponentModel.DataAnnotations;

namespace Showcase_Contactpagina.Models
{
    public class Contactform
    {
        [Required]
        [StringLength(60)]
        public string FirstName {  get; set; }

        [Required]
        [StringLength(60)]
        public string LastName {  get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [Phone]
        public string Phone { get; set; }

        [Required]
        //[Subject]
        public string Subject { get; set; }

        [Required]
        //[Description]
        public string Description { get; set; }

    }
}
