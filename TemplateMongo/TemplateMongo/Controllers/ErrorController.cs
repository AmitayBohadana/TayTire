using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace TemplateMongo.Controllers
{
    public class ErrorController : Controller
    {

        [Route("/error")]
        public IActionResult Error() => Problem();

        public IActionResult Index()
        {
            return View();
        }
    }
}