# Attique IITR

This is the repository for my submission for the SDSLabs Winter Of Code 2022

## About

Attique IITR is an information providing website, aiming to solve the worries of last minute readers and dedicated students alike. The web based app is built using node.js, express.js and handlebars and is hosted using heroku.

## Features:
- User friendly interface with easy to access functions and buttons.
- Fast execution speed for functions and APIs
- Secure login and sign up with hashed password storage.
- Defined roles with relavant access to each. A user, CR and group member have different permissions scopes for posting and deleting events but everybody has view access to ensure smooth flow of information across anybody willing to know.

## Why is Attique IITR relevant?

Attique IITR has been built to solve the ever eminent issue of information management. Students have a lot of events to manage and act on, especially in an online semester, but tend to miss deadlines or lack information as basic as the syllabus for an exam. Many students may want to know about the syllabus covered in different batches but have no means to do so. Attique IITR envisions solving the issue. 

## How to start?

- Clone the repository to your local system using `git clone -b` along with branch name and SSH Key.
- Run the terminal in that folder and install all necessary packages using `npm install`.
- Create a MySQL datbase and then place the database schema to your `C:/` drive or else Note :It is better to use the full path of the SQL file `file.sql` and then use command `mysql -u username -p database_name < file.sql` to import the schema to your database
- Create `.env` file and then 
`DB_HOST=your host name`
 `DB_NAME=name of database`
 `DB_USER=your database username`
 `DB_PASS=your database password`
 `SESS_NAME=session name`
 `SESS_SECRET=session secret`
 `CLIENT_ID=client ID for Oauth`
 `CLIENT_SECRET=client secret for Oauth`  
- Run the server with `npm start` and open `localhost:5000`. Now you're ready to start.  

To start off, one could choose between Channel-i OAuth and a sign up form. Once registered and password set, one can simply sign in next time or use the OAuth feature every time. On the dashboard, choose the branch and year and you're set to go. All information is now at the tips of your fingers and you may know whatever you need to. Data about all branches- the events, syllabus, etc- and about the groups- every intro talk and lecture- is now readily available across IITR.

## Author

[Darshan Kumar](https://github.com/itsdarshankumar)

## Mentors

- [Archit Gosain](https://github.com/Aviii06)
- [Reeshita Paul](https://github.com/reeshi-18)

## License 

Licensed under the [MIT License](LICENSE)