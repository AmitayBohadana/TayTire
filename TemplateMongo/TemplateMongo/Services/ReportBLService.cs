using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TemplateMongo.Model;
using TemplateMongo.Model.VM;

namespace TemplateMongo.Services
{
    public class ReportBLService
    {
        private readonly IMongoCollection<Report> _reports;

        private readonly DataService _dataService;
        private readonly VehicleService _vehicleService;
        public ReportBLService(ITayTireDatabaseSettings settings,DataService dataService, VehicleService vehicleService)
        {
            _dataService = dataService;
            _vehicleService = vehicleService;
            if (settings != null)
            {
                var client = new MongoClient(settings.ConnectionString);
                var database = client.GetDatabase(settings.DatabaseName);
                var dbName = settings.DatabaseName;
                _reports = database.GetCollection<Report>(settings.ReportCollectionName);
            }          
        }

        public ReportVM Create(ReportVM reportVm)
        {
            if(reportVm != null)
            {
                Vehicle vehicle = getVehicle(reportVm);
                //reportVm.vehicle.Id = vehicle.Id;
                Report report = reportVm;
                report.vehicle_id = vehicle.Id;
                _reports.InsertOne(report);
            }
            
            return reportVm;
        }

        public ReportVM GetReportVmByPlateNum(ReportVM reportVm)
        {
            ReportVM retVal = null;
            if (reportVm != null)
            {
                Vehicle vehicle = getVehicle(reportVm);
                retVal = new ReportVM();
                retVal.vehicle = vehicle;
            }
            return retVal;
        }

        private Vehicle getVehicle(ReportVM report)
        {

            Vehicle vehicle = null;
            
            if (report.vehicle != null)
            {
                vehicle = _vehicleService.GetByPlateNum(report.vehicle.plateNum);       
                if(vehicle == null)
                {
                    vehicle = report.vehicle;
                    _vehicleService.Create(vehicle);
                }
                if (!hasVehicleManufactureData(vehicle))
                {
                    _dataService.requestMoreVehicleData(vehicle, _vehicleService);
                }
            }
            
            return vehicle;
        }

        private bool hasVehicleManufactureData(Vehicle vehicle)
        {
            if(vehicle.manufacture == null || vehicle.manufacture == "")
            {
                return false;
            }
            else
            {
                return true;
            }
        }
    }
}
