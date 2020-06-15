using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using TemplateMongo.Controllers;
using TemplateMongo.Model;
using TemplateMongo.Services;

namespace TemplateMongo
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //taytire part
            services.Configure<TayTireDatabaseSettings>(
                Configuration.GetSection(nameof(TayTireDatabaseSettings)));

            services.AddSingleton<ITayTireDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<TayTireDatabaseSettings>>().Value);

            services.Configure<GlobalSettings>(
                Configuration.GetSection(nameof(GlobalSettings)));

            services.AddSingleton<IGlobalSettings>(sp =>
                sp.GetRequiredService<IOptions<GlobalSettings>>().Value);
            //
            // requires using Microsoft.Extensions.Options
            services.Configure<BookstoreDatabaseSettings>(
                Configuration.GetSection(nameof(BookstoreDatabaseSettings)));

            services.AddSingleton<IBookstoreDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<BookstoreDatabaseSettings>>().Value);



            //remove at deploy

            
            services.AddSingleton<ReportBLService>();
            services.AddSingleton<BookService>();
            services.AddSingleton<ReportService>();
            services.AddSingleton<DataService>();
            services.AddSingleton<VehicleService>();
            services.AddSingleton<MailMsgService>();
            services.AddSingleton<RepairTypeService>();
            services.AddSingleton<BaseDocumentService>();
            services.AddSingleton<DocsService>();
            services.AddSingleton<TireService>();
            services.AddSingleton<ImageService>();

            services.Configure<TireLocations>((settings) =>
            {
                Configuration.GetSection("HebrewTireLocations").Bind(settings);
            });

            services.AddControllers();
           // services.AddMvc();
        }



        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            if (!env.IsDevelopment())
            {
                app.UseHttpsRedirection();
            }
            

            app.UseDefaultFiles(new DefaultFilesOptions
            {
                DefaultFileNames = new
     List<string> { "index.html" }
            });
            
            app.UseStaticFiles();
            app.UseDirectoryBrowser();
            //app.UseFileServer();
            app.UseRouting();
            
           

            app.UseAuthorization();
            //app.UseSession();
            //app.UseSession();
            
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                /*
                endpoints.MapGet("/", async context =>
                {
                    await context.Response.WriteAsync("Hello World!");
                });*/
            });
            
        }


    }
}
