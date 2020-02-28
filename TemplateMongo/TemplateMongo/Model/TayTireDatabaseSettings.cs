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
    }

    public interface ITayTireDatabaseSettings
    {
        string TayTireCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
