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
        BaseDocumentService _documentService;
        DocsService _docsService;

        public ReportsController(BaseDocumentService documentService,DocsService docsService)
        {
            _documentService = documentService;
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
        public ActionResult<int[]> ReportDoc(ReportVM report)
        {
            return _docsService.CreatePdf(report);
        }
        public IActionResult Index()
        {
            return View();
        }
    }
}