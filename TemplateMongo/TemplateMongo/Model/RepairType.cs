using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TemplateMongo.Model
{
    [BsonIgnoreExtraElements]
    public class RepairType
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("code")]
        public int code { get; set; }
        public string type { get; set; }
        public string item { get; set; }
        public bool damaged { get; set; }
        
    }
}
