using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TemplateMongo.Model;

namespace TemplateMongo.Services
{
    public class ReportService
    {
        private readonly IMongoCollection<Report> _reports;

        public ReportService(ITayTireDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            var dbName = settings.DatabaseName;
            _reports = database.GetCollection<Report>(settings.ReportCollectionName);
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

        public void Remove(Report reportIn) =>
            _reports.DeleteOne(report => report.Id == reportIn.Id);

        public void Remove(string id) =>
            _reports.DeleteOne(report => report.Id == id);
    }
}

