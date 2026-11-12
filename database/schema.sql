IF DB_ID(N'GENIKA') IS NULL
    CREATE DATABASE GENIKA;
GO

USE GENIKA;
GO

IF OBJECT_ID(N'dbo.Returns', N'U') IS NULL
BEGIN
    CREATE TABLE dbo.Returns (
        ReturnId BIGINT IDENTITY(1,1) NOT NULL CONSTRAINT PK_Returns PRIMARY KEY,
        Reference NVARCHAR(30) NOT NULL,
        Customer NVARCHAR(120) NOT NULL,
        Material NVARCHAR(80) NOT NULL,
        QuantityKg DECIMAL(12,2) NOT NULL,
        Reason NVARCHAR(500) NOT NULL,
        Condition NVARCHAR(40) NOT NULL CONSTRAINT DF_Returns_Condition DEFAULT N'Requiere revisión',
        Status NVARCHAR(50) NOT NULL CONSTRAINT DF_Returns_Status DEFAULT N'Recibida',
        ReceivedAt DATETIME2(0) NOT NULL CONSTRAINT DF_Returns_ReceivedAt DEFAULT SYSUTCDATETIME(),
        CreatedAt DATETIME2(0) NOT NULL CONSTRAINT DF_Returns_CreatedAt DEFAULT SYSUTCDATETIME(),
        UpdatedAt DATETIME2(0) NULL,
        CONSTRAINT UQ_Returns_Reference UNIQUE (Reference),
        CONSTRAINT CK_Returns_Quantity CHECK (QuantityKg > 0)
    );
    CREATE INDEX IX_Returns_Status_ReceivedAt ON dbo.Returns (Status, ReceivedAt DESC);
END;
GO
