CREATE TYPE type_support AS ENUM ('dvd', 'bluray', 'numerique');

CREATE TABLE genre (
    id SERIAL PRIMARY KEY,
    libelle VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE film (
    id SERIAL PRIMARY KEY,
    titre VARCHAR(100) NOT NULL ,
    annee INTEGER NOT NULL ,
    duree_minute INTEGER NOT NULL, 
    support type_support NOT NULL DEFAULT 'dvd',
    disponible BOOLEAN NOT NULL DEFAULT TRUE,
    genre_id INTEGER NOT NULL REFERENCES genre(id)    
);