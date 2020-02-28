using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TemplateMongo.Model { 
    public class WorkEvent
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("tireSize")]
        public string workDescription { get; set; }

    }
}