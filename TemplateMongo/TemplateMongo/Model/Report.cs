﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TemplateMongo.Model
{
    public class Report
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        
        [BsonElement("leasingCompany")]
        public string leasingCompany { get; set; }

        public string tireCompany { get; set; }

        public User user { get; set; }

        public Vehicle vehicle { get; set; }
        public List<WorkEvent> workEvents { get; set; }

 
    }
}
