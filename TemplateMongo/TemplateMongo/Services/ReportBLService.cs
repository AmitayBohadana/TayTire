using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using Newtonsoft.Json;
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
        private readonly ReportService _reportService;
        public ReportBLService(ITayTireDatabaseSettings settings,DataService dataService, VehicleService vehicleService,ReportService reportService)
        {
            _dataService = dataService;
            _vehicleService = vehicleService;
            _reportService = reportService;
            if (settings != null)
            {
                var client = new MongoClient(settings.ConnectionString);
                var database = client.GetDatabase(settings.DatabaseName);
                var dbName = settings.DatabaseName;
                _reports = database.GetCollection<Report>(settings.ReportCollectionName);
            }          
        }

        internal ActionResult<List<ReportVM>> GetAllReportVM()
        {
            List<ReportVM> list = null;
            List<Report> reports = null;
            reports = _reportService.Get();
            if (reports != null)
            {
                list = new List<ReportVM>();
                reports.ForEach(report =>
                {
                    ReportVM reportVm = convertToViewModel(report);
                    /*
                    Vehicle vehicle = _vehicleService.Get(report.vehicle_id);
                    var serializedParent = JsonConvert.SerializeObject(report);
                    ReportVM reportVm = JsonConvert.DeserializeObject<ReportVM>(serializedParent);
                    reportVm.vehicle = vehicle;
                    */

                    list.Add(reportVm);
                });
            }
            return list;
        }

        private ReportVM convertToViewModel(Report report)
        {
            ReportVM retVal;
            Vehicle vehicle = _vehicleService.Get(report.vehicle_id);
            var serializedParent = JsonConvert.SerializeObject(report);
            retVal = JsonConvert.DeserializeObject<ReportVM>(serializedParent);
            retVal.vehicle = vehicle;
            return retVal;
        }

        public ReportVM Create(ReportVM reportVm)
        {
            if(reportVm != null)
            {
                Vehicle vehicle = updateOrCreateVehicle(reportVm);
                //reportVm.vehicle.Id = vehicle.Id;
                Report report = reportVm;

                report.status = "ממתין";                
                report.vehicle_id = vehicle.Id;
                _reports.InsertOne(report);
            }
            
            return reportVm;
        }

        internal void CancelReport(ReportVM reportVm)
        {
            _reportService.Remove(reportVm);
        }

        public ReportVM GetReportVmByPlateNum(ReportVM reportVm)
        {
            ReportVM retVal = null;
            if (reportVm != null)
            {
                Vehicle vehicle = updateOrCreateVehicle(reportVm);
                retVal = new ReportVM();
                retVal.vehicle = vehicle;
            }
            return retVal;
        }

        public ReportVM GetNewReportByPlateNum(ReportVM reportVm)
        {
            ReportVM retVal = new ReportVM();
            Vehicle vehicle = GetVehicle(reportVm);
            if (vehicle != null)
            {
                retVal.vehicle = vehicle;
            }
            else{
                retVal.vehicle = new Vehicle();
            }
            return retVal;
        }

        internal ReportVM ChangeReportStatus(ReportVM reportVm)
        {
            ReportVM retVal = null;
            if (reportVm.confirmationNum!= null)
            {
                reportVm.status = "confirmed";
            }
            _reportService.Update(reportVm.Id,reportVm);
            Report report = _reportService.Get(reportVm.Id);
            retVal = convertToViewModel(report);
            return retVal;
        }

        public Vehicle GetVehicle(ReportVM reportVm)
        {
            Vehicle vehicle = null;
            if (reportVm.vehicle != null)
            {
                vehicle = _vehicleService.GetByPlateNum(reportVm.vehicle.plateNum);
            }
            
            return vehicle;
        }
        private Vehicle updateOrCreateVehicle(ReportVM report)
        {

            Vehicle vehicle = null;
            
            if (report.vehicle != null)
            {
                vehicle = _vehicleService.GetByPlateNum(report.vehicle.plateNum);       
                if(vehicle == null) //First time vehicle num appears
                {
                    vehicle = report.vehicle;
                    _vehicleService.Create(vehicle);
                }
                else
                {
                    vehicle = updateVehicleObj(vehicle,report.vehicle);
                    _vehicleService.Update(vehicle.Id,vehicle);
                }
                if (!hasVehicleManufactureData(vehicle))
                {
                    _dataService.requestMoreVehicleData(vehicle, _vehicleService);
                }
            }
            
            return vehicle;
        }

        private Vehicle updateVehicleObj(Vehicle oldVehicle, Vehicle newVehicle)
        {
            Vehicle retVal= oldVehicle;
            if(oldVehicle == null)
            {
                retVal = newVehicle;
            }
            else
            {
                //need to validate new vehicle
                retVal.km = newVehicle.km;
                retVal.tires = newVehicle.tires;
                retVal.tireSize = newVehicle.tireSize;

            }
            return retVal;
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
