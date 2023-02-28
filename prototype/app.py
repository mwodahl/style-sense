import sqlite3
from flask import Flask, render_template, request, url_for, flash, redirect
from werkzeug.exceptions import abort

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

app = Flask(__name__)
app.config['SECRET_KEY'] = 'S/h5Tvz]XV42d?;HYWI%$:y]@}+C69/CT]gBaWjUYF-/A5u.3l$T%mju}S"&Wh6'

# Routes
@app.route('/')
def index():
    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users where id = ?', (2,)).fetchone()
    outfits = conn.execute('SELECT * FROM outfits where user_id = ?', (2,)).fetchall()
    conn.close()
    return render_template('home.html', user=user, outfits=outfits)

@app.route('/account', methods=('GET',))
def account():
    # if request.method == 'POST':
    #     name = request.form['name']
    #     username = request.form['username']
    #     password = request.form['password']

    #     if not name:
    #         flash('Name is required!')
    #     else:
    #         conn = get_db_connection()
    #         conn.execute('INSERT INTO users (name, username, password) VALUES (?, ?, ?)',
    #                      (name, username, password))
    #         conn.commit()
    #         conn.close()
    #         return redirect(url_for('index'))
    # hardcoded
    user = get_user(2)
    return render_template('edit.html', user=user)

# @app.route('/<int:id>/edit', methods=('GET', 'POST'))
# def edit(id):
#     user = get_user(id)

#     if request.method == 'POST':
#         name = request.form['name']
#         username = request.form['username']
#         password = request.form['password']

#         if not name:
#             flash('Name is required!')
#         else:
#             conn = get_db_connection()
#             conn.execute('UPDATE users SET name = ?, username = ?, password = ?'
#                          ' WHERE id = ?',
#                          (name, username, password, id))
#             conn.commit()
#             conn.close()
#             return redirect(url_for('index'))

#     return render_template('edit.html', user=user)

# Helper Functions
def get_user(user_id):
    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users where id = ?', (user_id,)).fetchone()
    conn.close()
    if user is None:
        abort(404)
    return user

