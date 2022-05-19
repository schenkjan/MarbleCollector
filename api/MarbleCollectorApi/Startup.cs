using MarbleCollectorApi.Config;
using MarbleCollectorApi.Data;
using MarbleCollectorApi.Data.Repository;
using MarbleCollectorApi.Hubs;
using MarbleCollectorApi.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.IO;
using System.Reflection;
using System.Text;

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
        public AuthenticationConfigSection AuthenticationConfig =>
            Configuration.GetSection(AuthenticationConfigSection.Name).Get<AuthenticationConfigSection>();

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(MarbleCollectorCorsPolicy,
                    builder => builder.WithOrigins(MarbleCollectorCorsOrigins)
                                        .AllowAnyHeader()
                                        .AllowAnyMethod()
                                        .AllowCredentials() // added for signalr connection
                );
            });

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = AuthenticationConfig.TokenIssuer,
                        ValidateAudience = true,
                        ValidAudience = AuthenticationConfig.TokenAudience,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,

                        IssuerSigningKey = new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes(AuthenticationConfig.TokenSecret)
                        )
                    };
                });

            // Singletons
            services.AddSingleton<IAuthService>(new AuthService(AuthenticationConfig));
            services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            // Repositories
            services.AddScoped<IChoreRepository, ChoreRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IAssignmentRepository, AssignmentRepository>();
            services.AddScoped<IGrantRepository, GrantRepository>();
            services.AddScoped<IRewardRepository, RewardRepository>();

            // Services
            services.AddScoped<IUserScoreService, UserScoreService>();

            // Database Context
            services.AddDbContext<MarbleCollectorDbContext>(options =>
                options.UseMySql(Configuration.GetConnectionString("MarbleCollectorMySQL"), new MariaDbServerVersion("10.6.7")));

            services.AddControllers();
            services.AddSignalR();

            // ensure that swagger shows authn/authz info
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "MarbleCollector API",
                    Version = "v1"
                });
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please insert JWT with Bearer into field",
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        }, new string[] { }
                    }
                });

                // Set the comments path for the Swagger JSON and UI.
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            });
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

            //app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseCors(MarbleCollectorCorsPolicy);

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<ChildNotificationHub>("/hubs/child");
                endpoints.MapHub<ParentNotificationHub>("/hubs/parent");
            });

            UpdateDatabase(app, env);
        }

        private void UpdateDatabase(IApplicationBuilder app, IWebHostEnvironment env)
        {
            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (var context = serviceScope.ServiceProvider.GetService<MarbleCollectorDbContext>())
                {
                    context.Database.Migrate();
                    // context.EnsureSeedData(false); // use this if you want demo data in local dev
                }
                //using (var context = serviceScope.ServiceProvider.GetService<MarbleCollectorDbContext>())
                //{
                //    context.EnsureSeedData(env.IsDevelopment()); // should create demo data when deploying to azure
                //}
            }
        }
    }
}
