CREATE TABLE [dbo].[BankAccount] (
    [AccountID]      INT           NOT NULL,
    [BranchNo]       NVARCHAR (50) NOT NULL,
    [AccountNo]      NVARCHAR (50) NOT NULL,
    [BillingAccount] NVARCHAR (50) NOT NULL,
    PRIMARY KEY CLUSTERED ([AccountID] ASC)
);

------------------------------------
CREATE TABLE [dbo].[ AvailableAppointments ] (
    [AppointmentID]   INT      IDENTITY (1, 1) NOT NULL,
    [TherapistID]     INT      NOT NULL,
    [AppointmentDate] DATE     NOT NULL,
    [TimeSlot]        TIME (7) NOT NULL,
    [DurationMinutes] INT      NOT NULL,
    [Specialization]  INT      NOT NULL,
    PRIMARY KEY CLUSTERED ([AppointmentID] ASC),
    FOREIGN KEY ([TherapistID]) REFERENCES [dbo].[Therapists] ([TherapistID])
);

CREATE TABLE [dbo].[Appointments] (
    [AppointmentID]   INT          IDENTITY (1, 1) NOT NULL,
    [PatientID]       INT          NOT NULL,
    [TherapistID]     INT          NOT NULL,
    [AppointmentDate] DATE         NOT NULL,
    [AppointmentTime] TIME (7)     NOT NULL,
    PRIMARY KEY CLUSTERED ([AppointmentID] ASC),
    FOREIGN KEY ([PatientID]) REFERENCES [dbo].[Patients] ([PatientID]),
    FOREIGN KEY ([TherapistID]) REFERENCES [dbo].[Therapists] ([TherapistID])
);


CREATE TABLE [dbo].[AppointmentsPassed] (
    [AppointmentID]   INT          IDENTITY (1, 1) NOT NULL,
    [PatientID]       INT          NOT NULL,
    [TherapistID]     INT          NOT NULL,
    [AppointmentDate] DATE         NOT NULL,
    [AppointmentTime] TIME (7)     NOT NULL,
    [Status]          VARCHAR (50) NULL,
    PRIMARY KEY CLUSTERED ([AppointmentID] ASC),
    FOREIGN KEY ([PatientID]) REFERENCES [dbo].[Patients] ([PatientID]),
    FOREIGN KEY ([TherapistID]) REFERENCES [dbo].[Therapists] ([TherapistID])
);


CREATE TABLE [dbo].[Patients] (
    [PatientID]   INT             IDENTITY (1, 1) NOT NULL,
    [FirstName]   VARCHAR (50)    NOT NULL,
    [LastName]    VARCHAR (50)    NOT NULL,
    [Age]         INT             NOT NULL,
    [PhoneNumber] VARCHAR (15)    NOT NULL,
    PRIMARY KEY CLUSTERED ([PatientID] ASC)
);

CREATE TABLE [dbo].[Therapists] (
    [TherapistID]    INT          NOT NULL,
    [FirstName]      VARCHAR (50) NOT NULL,
    [LastName]       VARCHAR (50) NOT NULL,
    [Specialization] INT          NOT NULL,
    [PhoneNumber]    NCHAR (10)   NOT NULL,
    PRIMARY KEY CLUSTERED ([TherapistID] ASC),
);



