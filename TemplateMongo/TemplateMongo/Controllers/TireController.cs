using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TemplateMongo.Model;
using TemplateMongo.Services;

namespace TemplateMongo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TireController : Controller
    {
        private readonly TireService _tireService;
        public TireController(TireService tireService) 
        {
            _tireService = tireService;
        }
        [HttpGet]
         public ActionResult<List<TireBrand>> Get() =>
                _tireService.GetTireBrands();


        [HttpGet("byName")]
        public ActionResult<List<string>> Get(string name)
        {
            var retVal = _tireService.FindTireBrand(name);
            return retVal;
        }

        [HttpPost]
        [Route("CreateTire")]
        public ActionResult<Tire> CreateTire([FromForm]Tire tire)
        {
            Tire retVal=null;// = _reportBLService.SetReportConfirmed(reportVm);

            if (retVal == null)
            {
                return NotFound();
            }

            return retVal;
        }


    }
}