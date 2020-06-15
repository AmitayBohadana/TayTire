using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TemplateMongo.Model
{
    public class TirePic
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string tireSize { get; set; }
        public string manufacture { get; set; }
        public int location { get; set; }
        public IFormFile image { get; set; }
    }
}
