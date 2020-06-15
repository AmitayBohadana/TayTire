using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TemplateMongo.Model;
using TemplateMongo.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TemplateMongo.Controllers
{
    [Route("api/[controller]")]
    public class ImageController : ControllerBase
    {

        private readonly ImageService _imageService;
        public ImageController(ImageService imageService)
        {
            _imageService = imageService;
        }
        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        [HttpPost]
        public ActionResult<string> Post([FromForm]TirePic tirePic)
        {
            Tire tire = new Tire();
            tire.manufacture = "test";
            TirePic retVal = _imageService.Create(tirePic);

            if (retVal == null)
            {
                return NotFound();
            }
            
            return retVal.Id;
        }
      
        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
