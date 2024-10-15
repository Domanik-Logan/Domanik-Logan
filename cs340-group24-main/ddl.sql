DROP TABLE IF EXISTS Events;
DROP TABLE IF EXISTS Profiles;
DROP TABLE IF EXISTS Accounts;
DROP TABLE IF EXISTS Movies;
DROP TABLE IF EXISTS Actors;


CREATE TABLE Accounts (
    accountID int AUTO_INCREMENT PRIMARY KEY,
    address varchar(255) NOT NULL,
    city varchar(255) NOT NULL,
    countryCode varchar(255) NOT NULL,
    email varchar(255) NOT NULL
);

CREATE TABLE Profiles (
    accountID int,
    profile varchar(255) NOT NULL,
    PRIMARY KEY (accountID, profile),
    CONSTRAINT fk_accountID FOREIGN KEY (accountID) REFERENCES Accounts(accountID)
);

CREATE TABLE Movies (
    movieID int AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    year int NOT NULL,
    genre varchar(255) NOT NULL,
    actors varchar(255) NOT NULL,
    PRIMARY KEY(movieID)
);

CREATE TABLE Events (
    eventID int AUTO_INCREMENT PRIMARY KEY,
    accountID int,
    profile varchar(255),
    movieID int,
    CONSTRAINT fk_EaccountID FOREIGN KEY (accountID) REFERENCES Profiles(accountID),
    CONSTRAINT fk_movieID FOREIGN KEY (movieID) REFERENCES Movies(movieID)
);

CREATE TABLE Actors (
    actorID int AUTO_INCREMENT PRIMARY KEY,
    actorName varchar(255) NOT NULL
);


-- Insert some movies
INSERT INTO Movies (title, year, genre, actors) VALUES 
("Shrek", 2001, "Comedy", '{"actor1": "Mike Myers"}'),
("Austin Powers", 1997, "Comedy", '{"actor1": "Mike Myers", "actor2": "Elizabeth Hurley"}');

-- insert some actors
INSERT INTO Actors (actorName) VALUES 
("Mike Myers"),
("Elizabeth Hurley");

-- insert some accounts
INSERT INTO Accounts (address, city, countryCode, email) VALUES 
("123 Main St", "New York", "US", "john.doe@example.com"),
("456 Elm St", "Los Angeles", "US", "jane.doe@example.com");

-- insert some profiles associated with the above accounts
INSERT INTO Profiles (accountID, profile) VALUES 
(1, '{ "profile1": "John", "profile2": "John Jr" }'),
(2, '{ "profile1": "Jane", "profile2": "Jane Jr" }');

-- insert some events
INSERT INTO Events (accountID, profile, movieID) VALUES 
(1,"John", 1),
(1,"John", 2),
(2,"Jane", 2);