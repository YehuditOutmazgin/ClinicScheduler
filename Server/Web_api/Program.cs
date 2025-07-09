using DAL.Models;
using DAL.Services;
using BL.Api;
using BL.Services;
using DAL.Api;
using AutoMapper;
using BL;
using System.Text.Json.Serialization;
using BL.service;
using Serilog;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register application services
//bl
builder.Services.AddSingleton<DB_Manager>();
builder.Services.AddSingleton<IPatientsManager, PatientsManager>();
builder.Services.AddSingleton<IAppointmentsManager, AppointmentManager>();
builder.Services.AddSingleton<ITherapistManager, TherapistsManager>();
//--------------------------------------------------------------------------------------------------------------


// זה השורה החשובה!
builder.Services.AddHttpClient<IHolidayService, HolidayService>(client =>
{
    client.BaseAddress = new Uri("https://www.hebcal.com/hebcal");
    //client.Timeout = TimeSpan.FromMinutes(5);

});


//--------------------------------------------------------------------------------------------------------------

//Dal
builder.Services.AddSingleton<IWorkHoursDal, WorkHoursDal>();
builder.Services.AddSingleton<ITherapistsDal, TherapistsDal>();
builder.Services.AddSingleton<IAppointmentsDal, AppointmentsDal>();
builder.Services.AddSingleton<IAvailableAppointmentsDal, AvailableAppointmentsDal>();
builder.Services.AddSingleton<IPatientsDal, PatientsDal>();
builder.Services.AddSingleton<IPastAppointmentsDal, PastAppointmentsDal>();
builder.Services.AddSingleton<ICanceledAppointmentsDal, CanceledAppointmentsDal>();

//manager
builder.Services.AddScoped<BLManager>();

// Register AutoMapper

builder.Services.AddAutoMapper(cfg => cfg.AddMaps(typeof(Mapper).Assembly));
//------------------------------------------------------------

builder.Services.AddHostedService<MonthlyTaskService>();
/*builder.Services.AddHttpClient<IAvailableQueueManager, AvailableQueueManager>();
*/
//------------------------------------------------------------

builder.Services.AddControllers().AddJsonOptions(opt => opt.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve);

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });
//Logger
builder.Logging.ClearProviders(); // clear the logger, so no one will get the logs
builder.Logging.AddConsole();
builder.Logging.AddDebug();
Log.Logger = new LoggerConfiguration()
   .MinimumLevel.Information()// log level
   .WriteTo.Console() // Optional: Log to console
   .WriteTo.File("logs/log-.txt", rollingInterval: RollingInterval.Day) // Log to file
   .CreateLogger();
//react
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

builder.Host.UseSerilog();
var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseExceptionHandler("/error");
app.UseCors("AllowAll");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
