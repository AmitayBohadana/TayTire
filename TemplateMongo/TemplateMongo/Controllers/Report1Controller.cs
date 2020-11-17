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
        private readonly MailMsgService _mailService;
        private readonly RepairTypeService _repairTypeService;
        private readonly DocsService _docsService;
        public Report1Controller(ReportService reportService,DataService dataService, ReportBLService reportBLService,
            MailMsgService mailService,RepairTypeService repairTypesService,DocsService docsService)
        {
            _docsService = docsService;
            _mailService = mailService;
            _reportService = reportService;
            _dataService= dataService;
            _reportBLService = reportBLService;
            _repairTypeService = repairTypesService;
            
        }
        [HttpPost]
        [Route("ReportDoc")]
        public ActionResult<int[]> ReportDoc(ReportVM report)
        {
            string error;
            
            try
            {
                int[] res = _docsService.CreateTestPdf(report);
                return res;
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }
        }


        [HttpGet]
        public ActionResult<List<ReportVM>> Get() =>
                _reportBLService.GetAllActiveReportVM();
        



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
        [Route("GetVehicleByPlateNum")]
        public ActionResult<Vehicle> GetVehicleByPlateNum(Vehicle vehicle)
        {
            Vehicle retVal = _reportBLService.GetVehicleByPlateNum(vehicle);
            //if (retVal == null)
            //{
            //    return NotFound();
            //}

            return retVal;
        }

        [HttpPost]
        public ActionResult<ReportVM> Create(ReportVM reportVm)
        {
            ReportVM res = _reportBLService.Create(reportVm);


            return res;
        }

        [HttpPost]
        [Route("CancelReport")]
        public ActionResult<string> CancelReport(ReportVM reportVm)
        {
            string res =  _reportBLService.CancelReport(reportVm);

            return res;
        }
        [HttpPost]
        [Route("ReportDone")]
        public ActionResult<string> ReportDone(ReportVM reportVm)
        {
            string res = _reportBLService.ReportDone(reportVm);

            return res;
        }


        [HttpPost]
        [Route("ChangeReportStatus")]
        public ActionResult<ReportVM> ChangeReportStatus(ReportVM reportVm)
        {
            ReportVM retVal = _reportBLService.ChangeReportStatus(reportVm);
            
            if (retVal == null)
            {
                return NotFound();
            }

            return retVal;
        }

        [HttpPost]
        [Route("SetReportConfirmed")]
        public ActionResult<ReportVM> SetReportConfirmed(ReportVM reportVm)
        {
            ReportVM retVal = _reportBLService.SetReportConfirmed(reportVm);

            if (retVal == null)
            {
                return NotFound();
            }

            return retVal;
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

    }
}