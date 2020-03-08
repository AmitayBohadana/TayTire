using MongoDB.Driver;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using TemplateMongo.DTO;
using TemplateMongo.Model;

namespace TemplateMongo.Services
{
    public class DataService
    {
        private string govUrl = "https://data.gov.il/api/action/datastore_search";
        private static readonly HttpClient client = new HttpClient();
        public DataService()
        {

        }

        public async void GetVehicle(int carNum)
        {
            Vehicle vehicle = null;



            string reqUrl = createRequestUrl(9856830);

            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/vnd.github.v3+json"));
            client.DefaultRequestHeaders.Add("User-Agent", ".NET Foundation Repository Reporter");
            using (HttpResponseMessage res = await client.GetAsync(reqUrl))
            using (HttpContent content = res.Content)
            {

                string data = await content.ReadAsStringAsync();
                JObject json = JObject.Parse(data);

                if (data != null)
                {
                    JToken successT;
                    bool suces = json.TryGetValue("success", out successT);
                    if (successT.Value<bool>())
                    {
                        JToken resultT;
                        suces = json.TryGetValue("result", out resultT);
                        vehicle = convertResposeToVehicle(data);
                    }

                }
            }


        }

        public async void requestMoreVehicleData(Vehicle vehicleIn, VehicleService vehicleService)
        {
            Vehicle vehicle = null;

            string reqUrl = createRequestUrl(vehicleIn.plateNum);
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/vnd.github.v3+json"));
            client.DefaultRequestHeaders.Add("User-Agent", ".NET Foundation Repository Reporter");
            using (HttpResponseMessage res = await client.GetAsync(reqUrl))
            using (HttpContent content = res.Content)
            {
                string data = await content.ReadAsStringAsync();
                JObject json = JObject.Parse(data);

                if (data != null)
                {
                    JToken successT;
                    bool suces = json.TryGetValue("success", out successT);
                    if (successT.Value<bool>())
                    {
                        JToken resultT;
                        suces = json.TryGetValue("result", out resultT);
                        vehicle = convertResposeToVehicle(data);
                        JEnumerable<JToken> child = resultT.Children();
                        JToken records = child.ElementAt(5);
                        JEnumerable<JToken> recordsChild = records.Children();
                        JToken finalRec = recordsChild.ElementAt(0);
                        Records[] record = finalRec.ToObject<Records[]>();

                        loadToVehicle(record[0], vehicleIn);


                        vehicleService.Update(vehicleIn.Id,vehicleIn);
                    }
                }
            }
        }

        private void loadToVehicle(Records record, Vehicle vehicleIn)
        {
            string manufacture = record.tozeret_nm;
            string year = record.shnat_yitzur.ToString();
            string model = record.kinuy_mishari;

            vehicleIn.manufacture = manufacture;
            vehicleIn.model = model;
            
        }

        private Vehicle convertResposeToVehicle(string data)
        {
            Vehicle retVal = new Vehicle();


            return retVal;
        }

        private string createRequestUrl(int carNum)
        {
            string retVal = "";
            var builder = new UriBuilder(govUrl);
            builder.Port = -1;
            var query = HttpUtility.ParseQueryString(builder.Query);
            query["resource_id"] = "053cea08-09bc-40ec-8f7a-156f0677aff3";
            query["limit"] = "5";
            query["q"] = carNum.ToString();
            builder.Query = query.ToString();
            retVal = builder.ToString();
            return retVal;
        }
        private string createRequestUrl(string carNum)
        {
            string retVal = "";
            var builder = new UriBuilder(govUrl);
            builder.Port = -1;
            var query = HttpUtility.ParseQueryString(builder.Query);
            query["resource_id"] = "053cea08-09bc-40ec-8f7a-156f0677aff3";
            query["limit"] = "5";
            query["q"] = carNum;
            builder.Query = query.ToString();
            retVal = builder.ToString();
            return retVal;
        }
    }
}
