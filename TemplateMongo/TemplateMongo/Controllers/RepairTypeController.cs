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
    [Route("api/[controller]")]
    [ApiController]
    public class RepairTypeController : ControllerBase
    {
        private readonly RepairTypeService _repairTypeService;
        public RepairTypeController( RepairTypeService repairTypesService)
        {

            _repairTypeService = repairTypesService;
        }
        [HttpGet]
        public ActionResult<List<RepairType>> Get() =>
                _repairTypeService.Get();
    }
}