using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TemplateMongo.Model;

namespace TemplateMongo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : Controller
    {


        public ReportsController()
        {
            
        }

        [HttpPost]
        public ActionResult<Report> Create(Report book)
        {
         
            return CreatedAtRoute("GetBook", new { id = book.Id.ToString() }, book);
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}