using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TemplateMongo.Model
{
    [BsonIgnoreExtraElements]
    public class Report
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        
        [BsonElement("leasingCompany")]
        public string leasingCompany { get; set; }

        public string tireCompany { get; set; }

        public User user { get; set; }
      
        public string vehicle_id { get; set; }
        public List<WorkEvent> workEvents { get; set; }
        public string confirmationNum { get; set; }
        public string vehicle_plate_num { get; set; }
        public string status { get; set; }



    }
}
