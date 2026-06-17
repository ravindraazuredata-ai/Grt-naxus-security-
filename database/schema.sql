-- GRT Nexus Security Database Schema

IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE name = 'users' AND schema_id = SCHEMA_ID('dbo'))
BEGIN
  CREATE TABLE dbo.users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(150) NOT NULL,
    email NVARCHAR(255) NOT NULL UNIQUE,
    password_hash NVARCHAR(255) NOT NULL,
    role NVARCHAR(50) NOT NULL DEFAULT 'student',
    created_at DATETIME2 DEFAULT SYSUTCDATETIME()
  );
END
GO

IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE name = 'devices' AND schema_id = SCHEMA_ID('dbo'))
BEGIN
  CREATE TABLE dbo.devices (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(200) NOT NULL,
    ip_address NVARCHAR(50) NOT NULL,
    status NVARCHAR(50) NOT NULL,
    last_seen DATETIME2 DEFAULT SYSUTCDATETIME(),
    metadata NVARCHAR(MAX) NULL
  );
END
GO

IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE name = 'alerts' AND schema_id = SCHEMA_ID('dbo'))
BEGIN
  CREATE TABLE dbo.alerts (
    id INT IDENTITY(1,1) PRIMARY KEY,
    title NVARCHAR(255) NOT NULL,
    severity NVARCHAR(50) NOT NULL,
    message NVARCHAR(MAX) NOT NULL,
    source NVARCHAR(100) NULL,
    acknowledged BIT DEFAULT 0,
    created_at DATETIME2 DEFAULT SYSUTCDATETIME()
  );
END
GO

IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE name = 'notifications' AND schema_id = SCHEMA_ID('dbo'))
BEGIN
  CREATE TABLE dbo.notifications (
    id INT IDENTITY(1,1) PRIMARY KEY,
    type NVARCHAR(100) NOT NULL,
    title NVARCHAR(255) NOT NULL,
    message NVARCHAR(MAX) NOT NULL,
    is_read BIT DEFAULT 0,
    created_at DATETIME2 DEFAULT SYSUTCDATETIME()
  );
END
GO

IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE name = 'automation_rules' AND schema_id = SCHEMA_ID('dbo'))
BEGIN
  CREATE TABLE dbo.automation_rules (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(200) NOT NULL,
    trigger_type NVARCHAR(100) NOT NULL,
    trigger_config NVARCHAR(MAX) NULL,
    action_type NVARCHAR(100) NOT NULL,
    action_config NVARCHAR(MAX) NULL,
    enabled BIT DEFAULT 1,
    created_at DATETIME2 DEFAULT SYSUTCDATETIME()
  );
END
GO

IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE name = 'policies' AND schema_id = SCHEMA_ID('dbo'))
BEGIN
  CREATE TABLE dbo.policies (
    id INT IDENTITY(1,1) PRIMARY KEY,
    title NVARCHAR(255) NOT NULL,
    scope NVARCHAR(150) NOT NULL,
    status NVARCHAR(50) NOT NULL,
    level NVARCHAR(50) NOT NULL,
    priority INT DEFAULT 0,
    created_at DATETIME2 DEFAULT SYSUTCDATETIME()
  );
END
GO
