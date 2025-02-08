using Microsoft.AspNetCore.Mvc;

namespace Showcase_Profielpagina.Controllers
{
    public class TeamController : Controller
    {
        [Route("team")]
        public IActionResult Index()
        {
            return View();
        }
        

    }
}
