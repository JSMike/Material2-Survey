# Material2-Survey by Mike Cebrian

This app requires Node.js +0.10.x, npm +3.x, and MySQL Server.

To install:

Clone the repo.

run npm install

install typings

```
npm install -g typings
typings install
```

[install MySQL for your server](http://dev.mysql.com/doc/refman/5.7/en/installing.html).

Log in as the root user and run the SQL script `/scripts/setup-db.sql`

from the clonned directory run: `NODE_ENV='dev' node server/server.js`

direct your browswer to [http://localhost:3000](http://localhost:3000), or your domain at port 3000

Use the menu, and select login.
Use the credentials:
```
  username: admin
  password: password
```

Select: Create New Survey

Add title and survey options and save.

Select create new again until you've entered all of your survey questions.

View all of the surveys by selecting: Survey List

All existing surveys will be displayed on the survey list with an option to edit or view results.

You can then answer survey questions, or link other guest users to your hosted domain

A demo is live at [http://mcebrian.com:3000](http://mcebrian.com:3000)

This is Express + Angular2 app is licensed under MIT, be curious.
