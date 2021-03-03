using MarbleCollectorApi.Data;
using MarbleCollectorApi.Data.Repository;
using MarbleCollectorApi.Hubs;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;

namespace MarbleCollectorApi
{
    public class Startup
    {

        readonly string MarbleCollectorCorsPolicy = nameof(MarbleCollectorCorsPolicy);
        readonly string[] MarbleCollectorCorsOrigins = new[] {
            "http://localhost:3000",
            "https://marblecollector.z1.web.core.windows.net"
        };

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(MarbleCollectorCorsPolicy,
                    builder => builder.WithOrigins(MarbleCollectorCorsOrigins)
                                        .AllowAnyHeader()
                                        .AllowCredentials() // added for signalr connection
                );
            });

            services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddScoped<IChoreRepository, ChoreRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddDbContext<MarbleCollectorDbContext>(options =>
                options.UseSqlite(Configuration.GetConnectionString("MarbleCollectorSQLite")));

            services.AddControllers();
            services.AddSignalR();
            services.AddSwaggerGen();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.RoutePrefix = string.Empty;
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "MarbleCollector API");
            });

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseCors(MarbleCollectorCorsPolicy);

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<ParentNotificationHub>("/hubs/parent");
                endpoints.MapHub<ChildrenNotificationHub>("/hubs/children");
            });

            UpdateDatabase(app);
        }

        private void UpdateDatabase(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (var context = serviceScope.ServiceProvider.GetService<MarbleCollectorDbContext>())
                {
                    context.Database.Migrate();
                    context.EnsureSeedData();
                }
            }
        }
    }
}
