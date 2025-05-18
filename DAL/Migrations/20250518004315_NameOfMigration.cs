using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    /// <inheritdoc />
    public partial class NameOfMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Patients",
                columns: table => new
                {
                    PatientID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false, collation: "SQL_Latin1_General_CP1_CI_AS"),
                    LastName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false, collation: "SQL_Latin1_General_CP1_CI_AS"),
                    Age = table.Column<int>(type: "int", nullable: false),
                    PhoneNumber = table.Column<string>(type: "varchar(15)", unicode: false, maxLength: 15, nullable: false, collation: "SQL_Latin1_General_CP1_CI_AS")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Patients__970EC34695D48E27", x => x.PatientID);
                });

            migrationBuilder.CreateTable(
                name: "Therapists",
                columns: table => new
                {
                    TherapistID = table.Column<int>(type: "int", nullable: false),
                    FirstName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false, collation: "SQL_Latin1_General_CP1_CI_AS"),
                    LastName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false, collation: "SQL_Latin1_General_CP1_CI_AS"),
                    Specialization = table.Column<int>(type: "int", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nchar(10)", fixedLength: true, maxLength: 10, nullable: false, collation: "SQL_Latin1_General_CP1_CI_AS")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Therapis__4D6219123B144696", x => x.TherapistID);
                });

            migrationBuilder.CreateTable(
                name: " AvailableAppointments ",
                columns: table => new
                {
                    AppointmentID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TherapistID = table.Column<int>(type: "int", nullable: false),
                    AppointmentDate = table.Column<DateOnly>(type: "date", nullable: false),
                    TimeSlot = table.Column<TimeOnly>(type: "time", nullable: false),
                    DurationMinutes = table.Column<int>(type: "int", nullable: false),
                    Specialization = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__ Availab__8ECDFCA22FD333AC", x => x.AppointmentID);
                    table.ForeignKey(
                        name: "FK__ Availabl__Thera__0697FACD",
                        column: x => x.TherapistID,
                        principalTable: "Therapists",
                        principalColumn: "TherapistID");
                });

            migrationBuilder.CreateTable(
                name: "Appointments",
                columns: table => new
                {
                    AppointmentID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PatientID = table.Column<int>(type: "int", nullable: false),
                    TherapistID = table.Column<int>(type: "int", nullable: false),
                    AppointmentDate = table.Column<DateOnly>(type: "date", nullable: false),
                    AppointmentTime = table.Column<TimeOnly>(type: "time", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__tmp_ms_x__8ECDFCA29761D564", x => x.AppointmentID);
                    table.ForeignKey(
                        name: "FK__Appointme__Patie__51300E55",
                        column: x => x.PatientID,
                        principalTable: "Patients",
                        principalColumn: "PatientID");
                    table.ForeignKey(
                        name: "FK__Appointme__Thera__5AB9788F",
                        column: x => x.TherapistID,
                        principalTable: "Therapists",
                        principalColumn: "TherapistID");
                });

            migrationBuilder.CreateTable(
                name: "PassedAppointments",
                columns: table => new
                {
                    AppointmentID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PatientID = table.Column<int>(type: "int", nullable: false),
                    TherapistID = table.Column<int>(type: "int", nullable: false),
                    AppointmentDate = table.Column<DateOnly>(type: "date", nullable: false),
                    AppointmentTime = table.Column<TimeOnly>(type: "time", nullable: false),
                    Status = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true, collation: "SQL_Latin1_General_CP1_CI_AS")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__PassedAp__8ECDFCA288F68629", x => x.AppointmentID);
                    table.ForeignKey(
                        name: "FK__PassedApp__Patie__1B9317B3",
                        column: x => x.PatientID,
                        principalTable: "Patients",
                        principalColumn: "PatientID");
                    table.ForeignKey(
                        name: "FK__PassedApp__Thera__1C873BEC",
                        column: x => x.TherapistID,
                        principalTable: "Therapists",
                        principalColumn: "TherapistID");
                });

            migrationBuilder.CreateTable(
                name: "WorkHours",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    TherapistID = table.Column<int>(type: "int", nullable: false),
                    DayOfWeek = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: false, collation: "SQL_Latin1_General_CP1_CI_AS"),
                    StartTime = table.Column<TimeOnly>(type: "time", nullable: false),
                    EndTime = table.Column<TimeOnly>(type: "time", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__WorkHour__3214EC07CE44524E", x => x.Id);
                    table.ForeignKey(
                        name: "FK__WorkHours__Thera__09746778",
                        column: x => x.TherapistID,
                        principalTable: "Therapists",
                        principalColumn: "TherapistID");
                });

            migrationBuilder.CreateTable(
                name: "CanceledAppointments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    AppointmentID = table.Column<int>(type: "int", nullable: false),
                    PatientID = table.Column<int>(type: "int", nullable: false),
                    Note = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Canceled__3214EC07FE3D6961", x => x.Id);
                    table.ForeignKey(
                        name: "FK__CanceledA__Appoi__2F9A1060",
                        column: x => x.AppointmentID,
                        principalTable: "Appointments",
                        principalColumn: "AppointmentID");
                    table.ForeignKey(
                        name: "FK__CanceledA__Patie__2EA5EC27",
                        column: x => x.PatientID,
                        principalTable: "Patients",
                        principalColumn: "PatientID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ AvailableAppointments _TherapistID",
                table: " AvailableAppointments ",
                column: "TherapistID");

            migrationBuilder.CreateIndex(
                name: "IX_Appointments_PatientID",
                table: "Appointments",
                column: "PatientID");

            migrationBuilder.CreateIndex(
                name: "IX_Appointments_TherapistID",
                table: "Appointments",
                column: "TherapistID");

            migrationBuilder.CreateIndex(
                name: "IX_CanceledAppointments_AppointmentID",
                table: "CanceledAppointments",
                column: "AppointmentID");

            migrationBuilder.CreateIndex(
                name: "IX_CanceledAppointments_PatientID",
                table: "CanceledAppointments",
                column: "PatientID");

            migrationBuilder.CreateIndex(
                name: "IX_PassedAppointments_PatientID",
                table: "PassedAppointments",
                column: "PatientID");

            migrationBuilder.CreateIndex(
                name: "IX_PassedAppointments_TherapistID",
                table: "PassedAppointments",
                column: "TherapistID");

            migrationBuilder.CreateIndex(
                name: "IX_WorkHours_TherapistID",
                table: "WorkHours",
                column: "TherapistID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: " AvailableAppointments ");

            migrationBuilder.DropTable(
                name: "CanceledAppointments");

            migrationBuilder.DropTable(
                name: "PassedAppointments");

            migrationBuilder.DropTable(
                name: "WorkHours");

            migrationBuilder.DropTable(
                name: "Appointments");

            migrationBuilder.DropTable(
                name: "Patients");

            migrationBuilder.DropTable(
                name: "Therapists");
        }
    }
}
