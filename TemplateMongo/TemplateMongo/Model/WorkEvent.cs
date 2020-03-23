using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TemplateMongo.Model { 
    public class WorkEvent
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("workDescription")]
        public string workDescription { get; set; }
        public RepairType repairType { get; set; }
        public int amount { get; set; }
        public int location { get; set; }

    }
}