CREATE TABLE [dbo].Patients (
    PatientID INT NOT NULL PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Age INT NOT NULL,
    HealthInsuranceDetails VARCHAR(100) NOT NULL,
    PhoneNumber VARCHAR(15) NOT NULL,
	EmailAddress VARCHAR(50) NOT NULL,
	Price DECIMAL(10, 2) NOT NULL
);

