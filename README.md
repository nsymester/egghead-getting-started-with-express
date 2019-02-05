# MongoDB Integration

## Pre-install

Make sure MongoDB database is installed prior to using the mongodb npm package. You can download it 

for a Mac OS X from [https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/) and then install it using the instructions from Download from: [https://www.mongodb.com/download-center/community?jmp=docs](https://www.mongodb.com/download-center/community?jmp=docs)



## Using NPM Package MongoDB

Install the package by executing the following command:

```bash
npm i -S mongodb
```

This isn't MongoDB itself. It's just a library that'll let us access it from Node.



Start MongoDB by executing the following command:

```bash
sudo mongod
```

Import data using MongoDB import tool

```bash
mongoimport --db test --collection users --drop --file user_list.json
```

`--db test` : use the database named `test`.

`--collection users`: use the collection named users (equivalent to a tables in a traditional database; a document is equivalent to a row).

`--drop`: drop the collection if it needs to.

`--file`: use the `user_list.json`file to get the data.



## Using NPM Package Mongoose

Install the package by executing the following command:

```bash
npm i -S mongoose
```






