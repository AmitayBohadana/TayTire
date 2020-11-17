using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TemplateMongo.Model;
namespace TemplateMongo.Data
{
    public class ReportDAL
    {
        private readonly IMongoCollection<Report> _reports;
        public ReportDAL(ITayTireDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            var dbName = settings.DatabaseName;
            _reports = database.GetCollection<Report>(settings.ReportCollectionName);
            var res = _reports.Find(report => true).ToList();
        }

        public List<Report> Get() =>
            _reports.Find(report => true).ToList();

        public Report Get(string id) =>
            _reports.Find<Report>(report => report.Id == id).FirstOrDefault();

        public Report Create(Report report)
        {

            _reports.InsertOne(report);
            return report;
        }

        public void Update(string id, Report reportIn) =>
            _reports.ReplaceOne(report => report.Id == id, reportIn);

        public void Remove(Report reportIn)
        {
            var res = _reports.DeleteOne(report => report.Id == reportIn.Id);
        }


        public void Remove(string id) =>
            _reports.DeleteOne(report => report.Id == id);
    }

}


