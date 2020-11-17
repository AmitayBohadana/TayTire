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
            //var client = new MongoClient("mongodb+srv://root:root@cluster0.wrvw6.mongodb.net/TayTireDb?retryWrites=true&w=majority");
            var database = client.GetDatabase(settings.DatabaseName);
            var dbName = settings.DatabaseName;
            _reports = database.GetCollection<Report>(settings.ReportCollectionName);
            
            var res = _reports.Find(report => true).ToList();
        }

        public List<Report> Get() =>
            _reports.Find(report => true).ToList();
        public List<Report> GetActive() =>
            _reports.Find(report => report.status != "done").ToList();
        public Report Get(string id) =>
            _reports.Find<Report>(report => report.Id == id ).FirstOrDefault();

        public Report Create(Report report)
        {
            
            _reports.InsertOne(report);
            return report;
        }
       
        public void Update(string id, Report reportIn) =>
            _reports.ReplaceOne(report => report.Id == id, reportIn);

        public DeleteResult Remove(Report reportIn)
        {
            var res =_reports.DeleteOne(report => report.Id == reportIn.Id);
            return res;
        }
            

        public void Remove(string id) =>
            _reports.DeleteOne(report => report.Id == id);
    }
}

