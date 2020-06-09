﻿using System;
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
        public Report1Controller(ReportService reportService,DataService dataService, ReportBLService reportBLService,
            MailMsgService mailService,RepairTypeService repairTypesService)
        {
            _mailService = mailService;
            _reportService = reportService;
            _dataService= dataService;
            _reportBLService = reportBLService;
            _repairTypeService = repairTypesService;
        }

        [HttpGet]
        public ActionResult<List<ReportVM>> Get() =>
                _reportBLService.GetAllReportVM();
        



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
        [Route("GetNewReportByPlateNum")]
        public ActionResult<ReportVM> GetNewReportByPlateNum(ReportVM reportVm)
        {
            ReportVM retVal = _reportBLService.GetNewReportByPlateNum(reportVm);
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

        [HttpPost]
        [Route("CancelReport")]
        public ActionResult<ReportVM> CancelReport(ReportVM reportVm)
        {
            _reportBLService.CancelReport(reportVm);


            return CreatedAtRoute("GetBook", new { id = reportVm.Id.ToString() }, reportVm);
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