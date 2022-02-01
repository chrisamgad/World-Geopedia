CREATE DATABASE worldgeopedia;
use worldgeopedia;

-- DROP Table Country;
CREATE Table Country(
	CountryName VARCHAR(50) NOT NULL primary key,
    Population INT,
    Driving_side VARCHAR(50),
    OfficialLanguage VARCHAR(50),
    TimeZone VARCHAR(80),
    Calling_code VARCHAR(20),
    Legislature VARCHAR(100),
    Area FLOAT, 
    Continent VARCHAR(40),
    Currency VARCHAR(150),
    HDI FLOAT,
    WaterPercent FLOAT,
    Gini_index FLOAT,
    PPP_GDP FLOAT,
    Nominal_GDP FLOAT
);

CREATE TABLE CapitalCity(
	CountryName VARCHAR(50) NOT NULL Primary Key,
	Coordinates VARCHAR(50) ,
	CapitalCityName VARCHAR(50),
    Governor VARCHAR(50) ,
    Population INT ,
    Area FLOAT,
	Foreign Key (CountryName) REFERENCES country(CountryName) ON UPDATE cascade ON DELETE cascade
);

CREATE TABLE President(
	CountryName VARCHAR(50) primary key NOT NULL,
	PresidentName VARCHAR(30) ,
    PresidentBOD VARCHAR(30),
    Official_Assumption_Date VARCHAR(30),
    PoliticalParty VARCHAR(70),
    Foreign Key (CountryName) REFERENCES country(CountryName) ON UPDATE cascade ON DELETE cascade
);

CREATE TABLE User(
	Username VARCHAR(50) NOT NULL Primary Key ,
    Email_address VARCHAR(50) NOT NULL,
    Gender CHAR(1),
    UserBOD DATE 
);

CREATE TABLE UserCountriesTravelled(
	Username VARCHAR(50) NOT NULL,
    CountryName VARCHAR(50) NOT NULL,
    Travel_date DATE NOT NULL,
    Visit_rating INT,
    Textual_review VARCHAR(200),
    Primary key (Username,CountryName,Travel_date),
    FOREIGN KEY (Username) REFERENCES User(Username) ON UPDATE cascade ON DELETE cascade,
	Foreign Key (CountryName) REFERENCES country(CountryName) ON UPDATE cascade ON DELETE cascade
);




    