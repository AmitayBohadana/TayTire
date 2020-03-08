using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TemplateMongo.Model;
using TemplateMongo.Model.VM;
using TemplateMongo.Services;

namespace TemplateMongo.Controllers
{
    
    [ApiController]
    [Route("api/Report1")]
    public class Report1Controller : ControllerBase
    {
        private readonly ReportService _reportService;
        private readonly DataService _dataService;
        private readonly ReportBLService _reportBLService;
        public Report1Controller(ReportService reportService,DataService dataService, ReportBLService reportBLService)
        {
            _reportService = reportService;
            _dataService= dataService;
            _reportBLService = reportBLService;
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
        [Route("GetReportByPlateNum")]
        public ActionResult<ReportVM> GetReportByPlateNum(ReportVM reportVm)
        {


            ReportVM retVal = _reportBLService.GetReportVmByPlateNum(reportVm);

            if (retVal == null)
            {
                return NotFound();
            }

            return retVal;
        }

        [HttpPost]
        public ActionResult<ReportVM> Create(ReportVM reportVm)
        {
            _reportBLService.Create(reportVm);


            return CreatedAtRoute("GetBook", new { id = reportVm.Id.ToString() }, reportVm);
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