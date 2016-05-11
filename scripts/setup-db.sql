create database survey;
create user 'survey'@'localhost' identified by 'survey';
grant all privileges on survey.* to 'survey'@'localhost';
