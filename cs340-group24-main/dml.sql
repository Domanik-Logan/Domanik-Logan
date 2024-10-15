
SELECT movieID, title, genre, Actors.actorID AS actorID
    FROM Movies
        INNER JOIN Actors
        ON actorID= Actors.actorID;

SELECT * FROM Profile;

SELECT accountID, address, city, countryCode, email
    FROM Accounts;

SELECT * FROM Actors;

SELECT eventID, Accounts.accountID AS accountID, Profiles.profile AS profile, Movies.movieID AS movieID
    FROM Events
        INNER JOIN Accounts
        ON accountID= Accounts.accountID
        INNER JOIN Profiles
        ON profile= Profiles.profile
        INNER JOIN Movies
        ON movieID= Movies.movieID;

INSERT INTO Accounts (address, city, countryCode, email)
    VALUES (:addressInput, :cityInput, :countryInput, :emailInput);

insert into Profiles (accountID, profile) values (:accountID, :profileName);

insert into Movies (title, year, genre, actors) values (:titleIN, :yearIN, :genreIN, :actorsIN);

insert into Actors (actorName) values (:name);

update Profiles set profile = :profileNameIN where accountID = :accountIDupdate;

UPDATE Accounts
    SET address = :addressInput, city = :cityInput, countryCode = :countryInput, email = :emailInput
    WHERE accountID = :accountIDUpdate;

update Movies set title = :titleIN, year = :yearIN, genre = :genreIN, actors = :actorsIN where movieID = :movieIDupdate;

update Actors set actorName = :name where actorID = :actorIDupdate;

DELETE FROM Accounts WHERE accountID = :accountIDDelete;

DELETE FROM Movie WHERE movieID = :MovieIDDelete;

DELETE FROM Actors WHERE actorID = :MovieIDDelete;

delete from Profiles where accountID = :accountIDdelete and profile = :profileDelete;

delete from Events where eventID = :eventIDdelete;

-- not yet implemented in UI:

-- events.html SELECT with Movie Filter from movies -> watches flow

select * from Events where movieID = :movieIDselected;

-- movies.html SELECT with Actor Filter from actors -> movies flow

select * from Movies where actor like '%:actorIDselected%';