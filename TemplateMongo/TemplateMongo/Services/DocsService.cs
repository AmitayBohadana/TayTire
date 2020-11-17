using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TemplateMongo.Model.VM;

namespace TemplateMongo.Services
{
    public class DocsService
    {
        private BaseDocumentService _baseService;
        
        public DocsService(BaseDocumentService baseService)
        {
            
       
            _baseService = baseService;
       
        }

        public int[] CreatePdf(ReportVM report)
        {
       
            _baseService.NewDoc();
            _baseService.NewPage();
            _baseService.addMainHeader(report.Id.Substring(0,5));
            _baseService.addreportHeader(report);
            _baseService.addWorkBrief(report);
            _baseService.addVehiclePaint(report);
            int[] res = _baseService.GetDoc();
            
            return res;
        }
        public int[] CreateTestPdf(ReportVM report)
        {
            
            _baseService.NewDoc();
            _baseService.generateTestPage();
            //_baseService.addMainHeader(report.Id.Substring(0, 5));
            //_baseService.addreportHeader(report);
            //_baseService.addWorkBrief(report);
            //_baseService.addVehiclePaint(report);
            int[] res = _baseService.GetDoc();
            
            return res;
        }
    }
}
