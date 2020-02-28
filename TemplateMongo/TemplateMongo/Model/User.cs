using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TemplateMongo.Model
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("firstName")]
        public string firstName { get; set; }
        public string lastName { get; set; }

        public string phoneNum { get; set; }
    }
}