using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TemplateMongo.Model;

namespace TemplateMongo.Services
{
    public class LogService
    {
        private readonly IMongoCollection<Log> _logs;
        public LogService(ITayTireDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            var dbName = settings.DatabaseName;
            _logs = database.GetCollection<Log>("logs");

        }

        public void Log(string msg, object obj = null)
        {
            Log log = new Log();
            log.message = msg;
            log.obj = obj;
            _logs.InsertOne(log);
        }
    }
}
