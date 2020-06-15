using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using TemplateMongo.Model;

namespace TemplateMongo.Services
{
    public class ImageService
    {
        private readonly IMongoCollection<TirePic> _tirePics;
        public IGridFSBucket GridFsBucket { get; set; }
        public ImageService(ITayTireDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            IMongoDatabase database = client.GetDatabase(settings.DatabaseName);
            GridFsBucket = new GridFSBucket(database);
            _tirePics = database.GetCollection<TirePic>(settings.ImagesCollectionName);
        }

        public List<TirePic> Get() =>
            _tirePics.Find(tirePic => true).ToList();

        public TirePic Get(string id) =>
            _tirePics.Find<TirePic>(tirePic => tirePic.Id == id).FirstOrDefault();


        public TirePic Create(TirePic tirePic)
        {
            var file = tirePic.image;
            if (file.Length > 0)
            {
                using (var ms = new MemoryStream())
                {
                    file.CopyTo(ms);
                    var fileBytes = ms.ToArray();
                    //_tirePics.InsertOne(tirePic.image.ToBsonDocument());
                    ObjectId id = GridFsBucket.UploadFromBytes(tirePic.image.FileName, fileBytes);
                    tirePic.Id = id.ToString();
                    //string s = Convert.ToBase64String(fileBytes);
                    // act on the Base64 data
                    //ObjectId oid = new ObjectId(tirePic.Id);
                  
                    //var bytes = GridFsBucket.DownloadAsBytesAsync(oid);

                    //var fileStream = new MemoryStream();
                    //GridFsBucket.DownloadToStream(oid, fileStream);

                    
                }
            }
            
            //_tirePics.InsertOne(tirePic);
            return tirePic;
        }

        public void Update(string id, TirePic tirePicIn) =>
            _tirePics.ReplaceOne(tirePic => tirePic.Id == id, tirePicIn);

        public void Remove(TirePic bookIn) =>
            _tirePics.DeleteOne(tirePic => tirePic.Id == bookIn.Id);

        public void Remove(string id) =>
            _tirePics.DeleteOne(tirePic => tirePic.Id == id);
    }
}
