using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TemplateMongo.Model;

namespace TemplateMongo.Services
{
    public class VehicleService
    {
        private readonly IMongoCollection<Vehicle> _vehicle;

        public VehicleService(ITayTireDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            var dbName = settings.DatabaseName;
            _vehicle = database.GetCollection<Vehicle>(settings.VehicleCollectionName);
        }

        public List<Vehicle> Get() =>
            _vehicle.Find(vehicle => true).ToList();

        public Vehicle Get(string id) =>
            _vehicle.Find<Vehicle>(vehicle => vehicle.Id == id).FirstOrDefault();

        public Vehicle GetByPlateNum(string plateNum) =>
            _vehicle.Find<Vehicle>(vehicle => vehicle.plateNum == plateNum).FirstOrDefault();

        public Vehicle Create(Vehicle vehicle)
        {

            _vehicle.InsertOne(vehicle);
            return vehicle;
        }

        public void Update(string id, Vehicle vehicleIn) =>
            _vehicle.ReplaceOne(vehicle => vehicle.Id == id, vehicleIn);

        public void Remove(Vehicle vehicleIn) =>
            _vehicle.DeleteOne(vehicle => vehicle.Id == vehicleIn.Id);

        public void Remove(string id) =>
            _vehicle.DeleteOne(vehicle => vehicle.Id == id);
    }
}
