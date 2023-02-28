import sqlite3

connection = sqlite3.connect('database.db')


with open('schema.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

cur.execute("INSERT INTO users (name, username, password) VALUES (?, ?, ?)",
            ('Alicia Thoney', 'athoney', '1234')
            )

cur.execute("INSERT INTO users (name, username, password) VALUES (?, ?, ?)",
            ('Marc Wodahl', 'mwodahl', '1234')
            )

cur.execute("INSERT INTO users (name, username, password) VALUES (?, ?, ?)",
            ('Jenna Goodrich', 'jgoodrich', '1234')
            )

cur.execute("INSERT INTO users (name, username, password) VALUES (?, ?, ?)",
            ('Jenna Goodrich', 'jgoodrich', '1234')
            )

cur.execute("INSERT INTO outfits (user_id, name) VALUES (?, ?)",
            ('2', 'A Night Out')
            )

cur.execute("INSERT INTO outfits (user_id, name) VALUES (?, ?)",
            ('2', 'Summer Day')
            )

cur.execute("INSERT INTO outfits (user_id, name) VALUES (?, ?)",
            ('2', 'Career Fair')
            )

connection.commit()
connection.close()
