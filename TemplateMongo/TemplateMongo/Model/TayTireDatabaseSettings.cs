using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TemplateMongo.Model
{
    public class TayTireDatabaseSettings: ITayTireDatabaseSettings
    {
        public string TayTireCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
        public string ReportCollectionName { get; set; }
        public string VehicleCollectionName { get; set; }
        public string TireBrandCollectionName { get; set; }
        public string RepairTypeCollectionName { get; set; }
    }

    public interface ITayTireDatabaseSettings
    {
        string TayTireCollectionName { get; set; }
        string ReportCollectionName { get; set; }
        string VehicleCollectionName { get; set; }
        string TireBrandCollectionName { get; set; }
        string RepairTypeCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
