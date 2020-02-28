using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TemplateMongo.Model;
using TemplateMongo.Services;

namespace TemplateMongo.Controllers
{
    
    [ApiController]
    [Route("api/Report1")]
    public class Report1Controller : ControllerBase
    {
        private readonly ReportService _reportService;
        public Report1Controller(ReportService reportService)
        {
            _reportService = reportService;
        }

        [HttpGet]
        public ActionResult<List<Report>> Get() =>
                _reportService.Get();



        [HttpGet("{id:length(24)}", Name = "GetReport")]
        public ActionResult<Report> Get(string id)
        {
            var report = _reportService.Get(id);

            if (report == null)
            {
                return NotFound();
            }

            return report;
        }

        [HttpPost]
        public ActionResult<Report> Create(Report report)
        {
            _reportService.Create(report);

            return CreatedAtRoute("GetBook", new { id = report.Id.ToString() }, report);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Report reportIn)
        {
            var book = _reportService.Get(id);

            if (book == null)
            {
                return NotFound();
            }

            _reportService.Update(id, reportIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var book = _reportService.Get(id);

            if (book == null)
            {
                return NotFound();
            }

            _reportService.Remove(book.Id);

            return NoContent();
        }


        /*
        [HttpPost]
        [Route("newReport")]
        public ActionResult<Report> newReport(Report report)
        {
            _reportService.Create(report);
            var res = CreatedAtRoute("GetReport", new { id = report.Id.ToString() }, report);

            return res;
            
        }
        */
    }
}