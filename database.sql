USE StudentDB;
GO

DROP TABLE IF EXISTS students;
GO
CREATE TABLE Students (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) UNIQUE NOT NULL,
    Age INT
);
GO

-- Insert Sample Data
INSERT INTO Students (Name, Email, Age)
VALUES
('Zainab Fatima', 'zainab@example.com', 21),
('Ali Khan', 'ali@example.com', 22),
('Sara Ahmed', 'sara@example.com', 20);
GO

-- View Data
SELECT * FROM Students;
GO

-- Update Data
UPDATE Students
SET Age = 23
WHERE Id = 2;
GO

-- Delete Data
DELETE FROM Students
WHERE Id = 3;
GO

-- View Final Data
SELECT * FROM Students;
GO