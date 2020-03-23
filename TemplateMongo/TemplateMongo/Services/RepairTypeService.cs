using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TemplateMongo.Model;

namespace TemplateMongo.Services
{
    public class RepairTypeService
    {

        private readonly IMongoCollection<RepairType> _repairTypes;

        public RepairTypeService(ITayTireDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _repairTypes = database.GetCollection<RepairType>(settings.RepairTypeCollectionName);
        }
        public List<RepairType> Get() =>
            _repairTypes.Find(repairType => true).ToList();

        public RepairType Get(string id) =>
            _repairTypes.Find<RepairType>(repairType => repairType.Id == id).FirstOrDefault();

        public RepairType Create(RepairType repairType)
        {

            _repairTypes.InsertOne(repairType);
            return repairType;
        }

        public void Update(string id, RepairType repairTypeIn) =>
            _repairTypes.ReplaceOne(repairType => repairType.Id == id, repairTypeIn);

        public void Remove(RepairType repairTypeIn) =>
            _repairTypes.DeleteOne(repairType => repairType.Id == repairTypeIn.Id);

        public void Remove(string id) =>
            _repairTypes.DeleteOne(repairType => repairType.Id == id);
    }
}
