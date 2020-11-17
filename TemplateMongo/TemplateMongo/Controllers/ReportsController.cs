using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TemplateMongo.Model;
using TemplateMongo.Model.VM;
using TemplateMongo.Services;

namespace TemplateMongo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : Controller
    {
        DocsService _docsService;
        ReportBLService _reportBLService;
        public ReportsController(ReportBLService reportBLService,DocsService docsService)
        {
            _reportBLService = reportBLService; 

            _docsService = docsService;
        }

        [HttpGet]
        public ActionResult<int[]> Get() =>
                _docsService.CreatePdf(new ReportVM());

        [HttpPost]
        public ActionResult<Report> Create(Report book)
        {
         
            return CreatedAtRoute("GetBook", new { id = book.Id.ToString() }, book);
        }
        [HttpPost]
        [Route("ReportDoc")]
        public ActionResult<int[]> ReportDoc(ReportVM reportIn)
        {
            try
            {
                ReportVM report = _reportBLService.GetReportVM(reportIn.Id.ToString());
                int[] res = _docsService.CreatePdf(reportIn);
                return res;
            }
            catch(Exception e)
            {
                return NotFound(e.Message);
            }          
        }
        public IActionResult Index()
        {
            return View();
        }
    }
}