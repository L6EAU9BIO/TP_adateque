INSERT INTO genre (libelle) VALUES
    
    ('horreur'),
    ('fantastique'),
    ('science_fiction'),
    ('anime'),
    ('comedie');

INSERT INTO film (titre, annee, duree_minute, support, disponible, genre_id) VALUES
    
    ('L''exorciste', 1973, 122, 'dvd', true, (SELECT id FROM genre WHERE libelle = 'horreur')),
    ('Massacre à la tronçonneuse', 1974, 83,'bluray',false,(SELECT id FROM genre WHERE libelle = 'horreur')),
    ('Shining', 1980, 146,'numerique',true,(SELECT id FROM genre WHERE libelle = 'horreur')),
    ('Watchmen', 2009, 182,'numerique',true,(SELECT id FROM genre WHERE libelle = 'fantastique')),
    ('Le labyrinthe de Pan', 2006,118, 'bluray',true,(SELECT id FROM genre WHERE libelle = 'fantastique')),
    ('L''histoire sans fin', 1984, 104, 'dvd',false, (SELECT id FROM genre WHERE libelle = 'fantastique')),
    ('Terminator', 1984, 107, 'bluray', false,(SELECT id FROM genre WHERE libelle = 'science_fiction')),
    ('Alien, le 8ème passager', 1979, 117, 'bluray', true,(SELECT id FROM genre WHERE libelle = 'science_fiction')),
    ('Matrix', 1999, 136, 'dvd',true,(SELECT id FROM genre WHERE libelle = 'science_fiction')),
    ('Akira', 1988, 124,'dvd', true,(SELECT id FROM genre WHERE libelle = 'anime')),
    ('Porco Rosso', 1992, 94, 'dvd',true,(SELECT id FROM genre WHERE libelle = 'anime')),
    ('Ninja Scroll', 1993, 94, 'numerique', true,(SELECT id FROM genre WHERE libelle = 'anime')),
    ('Stupeur et Tremblement', 2003, 107, 'numerique', true,(SELECT id FROM genre WHERE libelle = 'comedie')),
    ('La classe américiane', 1993, 70, 'numerique', false,(SELECT id FROM genre WHERE libelle = 'comedie')),
    ('Qui veut la peau de Roger Rabbit', 1988, 104,'dvd',false,(SELECT id FROM genre WHERE libelle = 'comedie'));



