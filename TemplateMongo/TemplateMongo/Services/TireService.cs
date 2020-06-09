using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using TemplateMongo.Model;

namespace TemplateMongo.Services
{
    public class TireService
    {
        private readonly IMongoCollection<TireBrand> _tireBrands;

        public TireService(ITayTireDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            var dbName = settings.DatabaseName;
            _tireBrands = database.GetCollection<TireBrand>(settings.TireBrandCollectionName);

        }

        static async Task CreateIndex(ITayTireDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            var collection = database.GetCollection<TireBrand>(settings.TireBrandCollectionName);
        }

        public List<TireBrand> GetTireBrands() =>
            _tireBrands.Find(tireBrand => true).ToList();

        public TireBrand GetTireBrand(string name) =>
            _tireBrands.Find<TireBrand>(tireBrand => tireBrand.name == name).FirstOrDefault();

        public List<string> FindTireBrand(string partOfname)
        {
            List<string> brandNames = null;
            if (partOfname != null)
            {
                string textToFind = partOfname.ToUpper();
                var retVal = _tireBrands.Find<TireBrand>(tireBrand => tireBrand.name.ToUpper().Contains(textToFind))
                    .ToEnumerable()
                             .OrderBy(tireBrand => tireBrand.name.IndexOf(textToFind))
                             .ToList();
                brandNames = retVal.Select(tireBrand => tireBrand.name).ToList();
            }
            
            return brandNames;
        }
        public TireBrand Create(TireBrand tireBrand)
        {
            _tireBrands.InsertOne(tireBrand);
            return tireBrand;
        }
    }
}
