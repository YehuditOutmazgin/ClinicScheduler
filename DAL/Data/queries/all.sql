--CREATE  TABLE [dbo].[ HMO ](  --קופות חולים
--    HMO_ID INT PRIMARY KEY IDENTITY(1,1),  -- מזהה קופה, PRIMARY KEY
--    Name VARCHAR(100) NOT NULL, -- שם הקופה
--    ContactNumber VARCHAR(15) NOT NULL, -- מספר טלפון ליצירת קשר
--    Address TEXT NOT NULL -- כתובת
--);

--CREATE  TABLE [dbo].[ Patients] (
--    PatientID INT PRIMARY KEY IDENTITY(1,1), -- מזהה מטופל, PRIMARY KEY
--    FirstName VARCHAR(50) NOT NULL, -- שם פרטי
--    LastName VARCHAR(50) NOT NULL, -- שם משפחה
--    Age INT NOT NULL, -- גיל
--    HMO_ID INT NOT NULL, -- פרטי קופת חולים
--    PhoneNumber VARCHAR(15) NOT NULL, -- טלפון לעדכונים
--    Price DECIMAL(10, 2) NOT NULL, -- מחיר
--    FOREIGN KEY (HMO_ID) REFERENCES HMO(HMO_ID) -- קשר לטבלת קופ"ח
--);

--CREATE  TABLE [dbo].[ Therapists] (
--    TherapistID INT PRIMARY KEY IDENTITY(1,1), -- מזהה רופא, PRIMARY KEY
--    FirstName VARCHAR(50) NOT NULL, -- שם פרטי
--    LastName VARCHAR(50) NOT NULL, -- שם משפחה
--    Specialization VARCHAR(100) NOT NULL, -- התמחות
--    PhoneNumber VARCHAR(15) NOT NULL, -- טלפון
--    Email VARCHAR(100) NOT NULL -- דוא"ל
--);

--CREATE  TABLE [dbo].[ Appointments] (
--    AppointmentID INT PRIMARY KEY IDENTITY(1,1), -- מזהה תור, PRIMARY KEY
--    PatientID INT NOT NULL, -- מזהה מטופל, FOREIGN KEY
--    TherapistID INT NOT NULL, -- מזהה רופא, FOREIGN KEY
--    AppointmentDate DATE NOT NULL, -- תאריך התור
--    AppointmentTime TIME NOT NULL, -- שעת התור
--    Status VARCHAR(50) NOT NULL, -- סטטוס התור
--    FOREIGN KEY (PatientID) REFERENCES Patients(PatientID), -- קשר לטבלת מטופלים
--    FOREIGN KEY (TherapistID) REFERENCES Therapists(TherapistID) -- קשר לטבלת רופאים
--);

--c

--CREATE  TABLE [dbo].[ Invoices] (
--    InvoiceID INT PRIMARY KEY IDENTITY(1,1), -- מזהה חשבונית, PRIMARY KEY
--    PatientID INT NOT NULL, -- מזהה מטופל, FOREIGN KEY
--    InvoiceDate DATE NOT NULL, -- תאריך החשבונית
--    Amount DECIMAL(10, 2) NOT NULL, -- סכום
--    Status VARCHAR(50) NOT NULL, -- סטטוס החשבונית
--    FOREIGN KEY (PatientID) REFERENCES Patients(PatientID) -- קשר לטבלת מטופלים
--);

--CREATE  TABLE [dbo].[ Treatments] (
--    TreatmentID INT PRIMARY KEY IDENTITY(1,1), -- מזהה טיפול, PRIMARY KEY
--    TreatmentName VARCHAR(100) NOT NULL, -- שם הטיפול
--    Description TEXT NOT NULL, -- תיאור
--    Price DECIMAL(10, 2) NOT NULL -- מחיר
--);

--CREATE  TABLE [dbo].[ Prescriptions] (
--    PrescriptionID INT PRIMARY KEY IDENTITY(1,1), -- מזהה מרשם, PRIMARY KEY
--    PatientID INT NOT NULL, -- מזהה מטופל, FOREIGN KEY
--    TherapistID INT NOT NULL, -- מזהה רופא, FOREIGN KEY
--    PrescriptionDate DATE NOT NULL, -- תאריך המרשם
--    Medication VARCHAR(100) NOT NULL, -- תרופה
--    Dosage VARCHAR(50) NOT NULL, -- מינון
--    Instructions TEXT NOT NULL, -- הנחיות
--    FOREIGN KEY (PatientID) REFERENCES Patients(PatientID), -- קשר לטבלת מטופלים
--    FOREIGN KEY (TherapistID) REFERENCES Therapists(TherapistID) -- קשר לטבלת רופאים
--);

--CREATE  TABLE [dbo].[ BankDetails] (
--    BankDetailID INT PRIMARY KEY IDENTITY(1,1), -- מזהה פרטי חשבון בנק, PRIMARY KEY
--    TherapistID INT NOT NULL, -- מזהה רופא, FOREIGN KEY
--    BankName VARCHAR(100) NOT NULL, -- שם הבנק
--    BranchNumber VARCHAR(10) NOT NULL, -- מספר סניף
--    AccountNumber VARCHAR(20) NOT NULL, -- מספר חשבון
--    AccountHolderName VARCHAR(100) NOT NULL, -- שם בעל החשבון
--    FOREIGN KEY (TherapistID) REFERENCES Therapists(TherapistID) -- קשר לטבלת רופאים
--);
CREATE TABLE [dbo].[ Invoices] (
    [InvoiceID]   INT             IDENTITY (1, 1) NOT NULL,
    [PatientID]   INT             NOT NULL,
    [InvoiceDate] DATE            NOT NULL,
    [Amount]      DECIMAL (10, 2) NOT NULL,
    [Status]      VARCHAR (50)    NOT NULL,
    PRIMARY KEY CLUSTERED ([InvoiceID] ASC),
    FOREIGN KEY ([PatientID]) REFERENCES [dbo].[Patients] ([PatientID])
);

CREATE TABLE [dbo].[BankAccount] (
    [AccountID]         INT           NOT NULL,
    [BillingAccount]    NVARCHAR (50) NOT NULL,
    [TherapistID]       INT           NOT NULL,
    [BankName]          VARCHAR (100) NOT NULL,
    [BranchNumber]      VARCHAR (10)  NOT NULL,
    [AccountNumber]     VARCHAR (20)  NOT NULL,
    [AccountHolderName] VARCHAR (100) NOT NULL,
    PRIMARY KEY CLUSTERED ([AccountID] ASC)
);

CREATE TABLE [dbo].[Appointments] (
    [AppointmentID]   INT          IDENTITY (1, 1) NOT NULL,
    [PatientID]       INT          NOT NULL,
    [TherapistID]     INT          NOT NULL,
    [AppointmentDate] DATE         NOT NULL,
    [AppointmentTime] TIME (7)     NOT NULL,
    [Status]          VARCHAR (50) NOT NULL,
    PRIMARY KEY CLUSTERED ([AppointmentID] ASC),
    FOREIGN KEY ([PatientID]) REFERENCES [dbo].[Patients] ([PatientID]),
    FOREIGN KEY ([TherapistID]) REFERENCES [dbo].[Therapists] ([TherapistID])
);
CREATE TABLE [dbo].[Patients] (
    [PatientID]   INT             IDENTITY (1, 1) NOT NULL,
    [FirstName]   VARCHAR (50)    NOT NULL,
    [LastName]    VARCHAR (50)    NOT NULL,
    [Age]         INT             NOT NULL,
    [HMO_ID]      INT             NOT NULL,
    [PhoneNumber] VARCHAR (15)    NOT NULL,
    [Price]       DECIMAL (10, 2) NOT NULL,
    PRIMARY KEY CLUSTERED ([PatientID] ASC),
    FOREIGN KEY ([HMO_ID]) REFERENCES [dbo].[HMO] ([HMO_ID])
);

CREATE TABLE [dbo].[Therapists] (
    [TherapistID]    INT          NOT NULL,
    [FirstName]      VARCHAR (50) NOT NULL,
    [LastName]       VARCHAR (50) NOT NULL,
    [Specialization] INT          NOT NULL,
    [PhoneNumber]    NCHAR (10)   NOT NULL,
    [BankAccountId]  INT          NOT NULL,
    PRIMARY KEY CLUSTERED ([TherapistID] ASC),
    FOREIGN KEY ([BankAccountId]) REFERENCES [dbo].[BankAccount] ([AccountID])
);

CREATE TABLE [dbo].[HMO] (
    [HMO_ID]        INT           IDENTITY (1, 1) NOT NULL,
    [Name]          VARCHAR (100) NOT NULL,
    [ContactNumber] VARCHAR (15)  NOT NULL,
    [Address]       TEXT          NULL,
    PRIMARY KEY CLUSTERED ([HMO_ID] ASC)
);

CREATE TABLE [dbo].[ Treatments] (
    [TreatmentID]   INT             IDENTITY (1, 1) NOT NULL,
    [TreatmentName] VARCHAR (100)   NOT NULL,
    [Description]   TEXT            NOT NULL,
    [Price]         DECIMAL (10, 2) NOT NULL,
    PRIMARY KEY CLUSTERED ([TreatmentID] ASC)
);

CREATE TABLE [dbo].[ Prescriptions] (
    [PrescriptionID]   INT           IDENTITY (1, 1) NOT NULL,
    [PatientID]        INT           NOT NULL,
    [TherapistID]      INT           NOT NULL,
    [PrescriptionDate] DATE          NOT NULL,
    [Medication]       VARCHAR (100) NOT NULL,
    [Dosage]           VARCHAR (50)  NOT NULL,
    [Instructions]     TEXT          NOT NULL,
    PRIMARY KEY CLUSTERED ([PrescriptionID] ASC),
    FOREIGN KEY ([PatientID]) REFERENCES [dbo].[Patients] ([PatientID]),
    FOREIGN KEY ([TherapistID]) REFERENCES [dbo].[Therapists] ([TherapistID])
    ------------------------------
);



