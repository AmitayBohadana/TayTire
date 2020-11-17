using DocumentFormat.OpenXml.Vml;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Microsoft.AspNetCore.Http;
using TemplateMongo.Services;

namespace TemplateMongo.Model
{
    public class Tire
    {

        public Tire()
        {

        }
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("tireSize")]
        public string tireSize { get; set; }
        public string manufacture { get; set; }

        public string speedCode { get; set; }
        public string omesCode { get; set; }
        public int location { get; set; }
        public IFormFile image { get; set; }

    }
}