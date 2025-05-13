
using DAL.Models;
using DAL.Services;
using BL.Api;
using BL.Services;
using DAL.Api;
using AutoMapper;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register application services
builder.Services.AddSingleton<DB_Manager>();
builder.Services.AddSingleton<IPatientsManager, PatientsManager>();
builder.Services.AddSingleton<IAppointmentsManager, AppointmentManager>();
builder.Services.AddSingleton<IAppointmentsDal, AppointmentsDal>();
builder.Services.AddSingleton<IAvailableAppointmentsDal, AvailableAppointmentsDal>();
builder.Services.AddSingleton<IPatientsDal, PatientsDal>();
builder.Services.AddSingleton<IPassedAppointmentsDal, PassedAppointmentsDal>();
builder.Services.AddSingleton<ICanceledAppointmentsDal, CanceledAppointmentsDal>();

builder.Services.AddAutoMapper(cfg => cfg.AddMaps(typeof(Mapper).Assembly));

// Register AutoMapper
//builder.Services.AddAutoMapper(cfg => cfg.AddMaps(typeof(Program).Assembly));

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
