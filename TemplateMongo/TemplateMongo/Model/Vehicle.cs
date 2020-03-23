using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace TemplateMongo.Model
{
    public class Vehicle
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("plateNum")]
        public string plateNum { get; set; }

        public string manufacture { get; set; }
       
        public string model { get; set; }

        public int km { get; set; }
        public string tireSize { get; set; }
        //public Dictionary<int,Tire> carTires { get; set; }
        public List<Tire> tires { get; set; }
        public int numOfTires { get; set; }
        public Vehicle()
        {
            this.tires = new List<Tire>();
            this.numOfTires = 5;
            for (int i = 0; i < this.numOfTires; i++)
            {
                Tire tire = new Tire();
                tire.location = i + 1;
                this.tires.Add(tire);
            }
        }
    }
}