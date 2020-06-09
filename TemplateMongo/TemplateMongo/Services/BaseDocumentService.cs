
using iTextSharp.text;
using iTextSharp.text.pdf;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using TemplateMongo.Model;
using TemplateMongo.Model.VM;
using TemplateMongo.SettingsModel;

namespace TemplateMongo.Services
{
    public class BaseDocumentService
    {

        private readonly TireLocations _tireLocations;
        private readonly IWebHostEnvironment _env;
        private Document doc = null;
        PdfWriter writer = null;
        MemoryStream ms = null;
        BaseFont bf = null;
        public IConfiguration Configuration { get; }
        Font font = null;
        Font bfont = null;
        public BaseDocumentService(IConfiguration configuration, IWebHostEnvironment env, IOptions<TireLocations> options)
        {
            //ComponentInfo.SetLicense("FREE-LIMITED-KEY");
            _env = env;
            _tireLocations = options.Value;
            Configuration = configuration;
            //var obj1 = Configuration.GetSection("LocationSettings");
            //var config1 = Configuration.GetSection("LocationSettings").Get<Dictionary<string, string>>();

            //var obj = Configuration.GetSection("HebrewTireLocations");
            //var config = Configuration.GetSection("HebrewTireLocations").Get<Dictionary<string, string>>();

            var path = Path.Combine(_env.ContentRootPath, "fonts/arialuni.ttf");
            bf = BaseFont.CreateFont(path, BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
            font = new Font(bf, 10, Font.NORMAL, BaseColor.Black);
            bfont = new Font(bf, 12, Font.NORMAL, BaseColor.Black);
        }

        internal void addVehiclePaint(ReportVM report)
        {
            List<WorkEvent> worksEvent = report.workEvents;
            Dictionary<Tire, List<WorkEvent>> dict = getTireWorkEventDict(report);
            float[] fh = { 1 };
            float[] f = { 1, 1 };
            PdfPTable headerTable = getHeaderTable(fh, new List<string> { "תרשים רכב" }, true);
            PdfPTable table = newTable(f, null);


            List<PdfPCell> cells = new List<PdfPCell>();


            var last = dict.Last();
            foreach (KeyValuePair<Tire, List<WorkEvent>> entry in dict)
            {
                if (!last.Equals(entry))
                {
                    cells.Add(getTireCell(entry));
                }
            }
            table.AddCell(cells[3]);
            table.AddCell(cells[0]);
            table.AddCell(cells[2]);
            table.AddCell(cells[1]);

            PdfPCell lastCell = getTireCell(last);
            lastCell.Colspan = 2;
            table.AddCell(lastCell);

            doc.Add(headerTable);
            doc.Add(table);

        }



        private Dictionary<Tire, List<WorkEvent>> getTireWorkEventDict(ReportVM report)
        {
            Dictionary<Tire, List<WorkEvent>> dict = new Dictionary<Tire, List<WorkEvent>>();
            List<WorkEvent> workEvents = report.workEvents;
            List<Tire> tires = report.vehicle.tires;
            tires = tires.OrderBy(tire => tire.location).ToList();
            workEvents = workEvents.OrderBy(work => work.location).ToList();
            tires.ForEach(tire =>
            {
                List<WorkEvent> events = new List<WorkEvent>();
                events = getEventsByLocation(workEvents, tire.location);
                dict.Add(tire, events);
            });
            return dict;
        }

        private List<WorkEvent> getEventsByLocation(List<WorkEvent> workEvents, int location)
        {
            List<WorkEvent> res = new List<WorkEvent>();
            workEvents.ForEach(w =>
            {
                if (w.location == location)
                {
                    res.Add(w);
                }
            });
            return res;
        }

        private PdfPCell getTireCell(KeyValuePair<Tire, List<WorkEvent>> pair)
        {
            Tire tire = pair.Key;
            List<WorkEvent> works = pair.Value;
            PdfPCell cell = new PdfPCell();
            string location = "";
            LocationSettings.Locations_HE.TryGetValue(tire.location, out location);

            cell.AddElement(generateParagaph(String.Format(location), bfont, Element.ALIGN_CENTER));
            cell.AddElement(generateParagaph("יצרן: " + tire.manufacture, font, Element.ALIGN_LEFT));
            works.ForEach(work =>
            {
                cell.AddElement(generateParagaph(" * " + work.repairType.type, font, Element.ALIGN_LEFT));
            });


            return cell;
        }

        private IElement generateParagaph(string v, Font font, int align)
        {
            Paragraph p = new Paragraph(String.Format(v), font);
            p.Alignment = align;
            return p;
        }



        internal void addreportHeader(ReportVM report)
        {
            float[] f = { 1, 1, 1 };

            PdfPTable table = new PdfPTable(f);
            table.RunDirection = PdfWriter.RUN_DIRECTION_RTL;
            table.SpacingBefore = 3f;

            Vehicle vehicle = report.vehicle;

            PdfPTable headerTable = getHeaderTable(f, new List<string> { "פרטי צמיגיה", "פרטי רכב", "פרטי נהג" });

            table.AddCell(noBorderCell(new Phrase("צמיגי אילת בע''מ", font)));
            table.AddCell(noBorderCell(new Phrase("מס' רכב: " + vehicle.plateNum, font)));
            table.AddCell(noBorderCell(new Phrase("שם הנהג: " + report.user.firstName, font)));

            table.AddCell(noBorderCell(new Phrase("", font)));
            table.AddCell(noBorderCell(new Phrase("סוג: " + vehicle.manufacture + " " + vehicle.model, font)));
            table.AddCell(noBorderCell(new Phrase("טלפון: " + report.user.phoneNum, font)));

            table.AddCell(noBorderCell(new Phrase("", font)));
            table.AddCell(noBorderCell(new Phrase("מד אוץ: " + vehicle.km, font)));
            table.AddCell(noBorderCell(new Phrase("", font)));

            table.AddCell(noBorderCell(new Phrase("", font)));
            table.AddCell(noBorderCell(new Phrase("מידת צמיג: " + vehicle.tireSize, font)));
            table.AddCell(noBorderCell(new Phrase("", font)));

            doc.Add(headerTable);
            doc.Add(table);
        }

        internal void addWorkBrief(ReportVM report)
        {
            float[] f = { 4, 1 };
            PdfPTable table = newTable(f, 15f);
            //PdfPTable headerTable = getHeaderTable(f, new List<string> {  "כמות", "עבודה" });
            report.workEvents.ForEach(workEvent =>
            {
                string workLine = workEvent.repairType.type;
                table.AddCell(noBorderCell(new Phrase(" x" + workEvent.amount.ToString() + " " + workLine, font)));
                string location = getLocation(workEvent.location);
                table.AddCell(noBorderCell(new Phrase(" - " + location, font)));

            });
            //doc.Add(headerTable);
            doc.Add(table);
        }

        private string getLocation(int location)
        {
            string strLocation = "";
            LocationSettings.Locations_HE.TryGetValue(location, out strLocation);
            return strLocation;
        }

        private PdfPTable newTable(float[] f, float? spacingBefore)
        {
            PdfPTable table = new PdfPTable(f);
            table.RunDirection = PdfWriter.RUN_DIRECTION_RTL;
            if (spacingBefore != null)
            {
                table.SpacingBefore = (float)spacingBefore;
            }
            return table;
        } 
        
        private PdfPTable getHeaderTable(float[] f, List<string> list)
        {
            PdfPTable table = new PdfPTable(f);
            table.RunDirection = PdfWriter.RUN_DIRECTION_RTL;
            table.SpacingBefore = 15f;

            list.ForEach(header =>
            {
                table.AddCell(new PdfPCell(new Phrase(header, bfont)));
            });

            return table;
        }
        private PdfPTable getHeaderTable(float[] f, List<string> list,bool centered)
        {
            PdfPTable table = new PdfPTable(f);
            table.RunDirection = PdfWriter.RUN_DIRECTION_RTL;
            table.SpacingBefore = 15f;

            
            list.ForEach(header =>
            {
                PdfPCell cell = new PdfPCell();
                
                //PdfPCell cell = new PdfPCell();
                if (centered)
                {
                    cell.AddElement(generateParagaph(header, bfont, Element.ALIGN_CENTER));
                }
                else
                {
                    cell.AddElement(generateParagaph(header, bfont, Element.ALIGN_LEFT));
                }
                cell.BackgroundColor = BaseColor.LightGray;
                table.AddCell(new PdfPCell(new Phrase(header, bfont)));
            });
            return table;
        }


        internal void NewPage()
        {
            doc.NewPage();
        }
        internal int[] GetDoc()
        {
            doc.Close();
            byte[] bytes = ms.ToArray();
            int[] res = Array.ConvertAll(bytes, c => (int)c);
            return res;
        }

        internal void NewDoc()
        {
            this.doc = new Document(PageSize.A4);
            ms = new MemoryStream();
            writer = PdfWriter.GetInstance(doc, ms);
            doc.Open();
        }


        public int[] CreatePdf()
        {
            byte[] bytes = null;
            int[] res = null;
            using (MemoryStream ms = new MemoryStream())
            {

                // Add a first empty page.
                var path = Path.Combine(_env.ContentRootPath, "fonts/arialuni.ttf");
                BaseFont bf = BaseFont.CreateFont(path, BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
                Font gisha = new Font(bf, 10, Font.NORMAL, BaseColor.Black);
                Document document = new Document(PageSize.A4);

                PdfWriter writer = PdfWriter.GetInstance(document, ms);

                document.Open();
                generateTestPage(document, gisha);
                document.Close();
                var page = new Paragraph("בלה בלה בלה");

                bytes = ms.ToArray();
                res = Array.ConvertAll(bytes, c => (int)c);
                return res;

            }
            return res;
        }
        internal void addMainHeader(string reportId)
        {
            float[] f = { 1, 1, 1 };

            PdfPTable table = new PdfPTable(f);
            table.RunDirection = PdfWriter.RUN_DIRECTION_RTL;

            table.AddCell(noBorderCellAligned(new Phrase("www.taytech.com", bfont)));
            table.AddCell(noBorderCellAligned(new Phrase("מס דיווח - " + reportId, bfont)));
            table.AddCell(noBorderCellAligned(new Phrase("TayTech", bfont)));

            doc.Add(table);
        }
        private void generateTestPage(Document doc, Font gisha)
        {
            doc.NewPage();
            float[] f = { 1, 1, 1 };

            PdfPTable table = new PdfPTable(f);
            table.RunDirection = PdfWriter.RUN_DIRECTION_RTL;

            table.AddCell(noBorderCell(new Phrase("", gisha)));
            table.AddCell(noBorderCell(new Phrase("אהלן לכולם", gisha)));
            table.AddCell(noBorderCell(new Phrase("", gisha)));
            doc.Add(table);
        }

        private PdfPCell noBorderCell(Phrase phrase)
        {
            PdfPCell cell = new PdfPCell(phrase);
            cell.BorderColor = BaseColor.White;
            return cell;
        }
        private PdfPCell noBorderCellAligned(Phrase phrase)
        {
            PdfPCell cell = noBorderCell(phrase);
            cell.HorizontalAlignment = Element.ALIGN_CENTER;
            cell.VerticalAlignment = Element.ALIGN_MIDDLE;
            return cell;
        }

    }
}
