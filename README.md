# CS3219-Task-B

[![Build Status](https://travis-ci.org/marcfyk/CS3219-Task-B.svg?branch=master)](https://travis-ci.org/marcfyk/CS3219-Task-B)

## Overview

A simple REST API to facilitate CRUD operations to a mongodb database.

The database contains a single collection containing documents of modules.

Below is an example of a document.

```javascript
/**
 * _id: mongodb document id
 * module_code: code assigned to module
 * module_name: name / title assigned to module
 */ 
{
    "_id": "5f4dcef87881beed77be550b",
    "module_code": "CS3219",
    "module_name": "Software Engineering Principles and Patterns"
}
```

## Set up

Run `npm start` in this repository's directory.

## REST API

### Routes
- get module(s)
- add module
- update module
- delete module

#### **GET** `http://localhost:3000/module` 

##### Query keys
- module_code

If no query keys are present, the route will fetch all documents in the collection, and always return a `200` response with the documents.

If a query value is supplied as module_code, the route will fetch the document in the collection matching the module code.

If any other query values is supplied a `400` response is sent.

If a query parameter is supplied and a document is not found, a `404` is returned, else a `200` with the relevant document is returned.

##### Examples

- **GET** `http://localhost:3000/module`

Expected Response:
```javascript
{
    "documents": [
        {
            "_id": "5f4dcef87881beed77be550b",
            "module_code": "CS3219",
            "module_name": "Software Engineering Principles and Patterns"
        },
        ...
    ]
}
```

- **GET** `http://localhost:3000/module?module_code=CS3219`

Expected Response:
```javascript
{
    document: {
        "_id": "5f4dcef87881beed77be550b",
        "module_code": "CS3219",
        "module_name": "Software Engineering Principles and Patterns"
    }
}
```

#### **POST** `http://localhost:3000/module

##### Body keys
- module_code
- module_name

If the request body does not adhere to the format given above, a `400` is sent.

If the module code already exists in the database collection, a `400` is sent, with a message indicating that the document with the module code is already inside the database, and there will be no document added.

If not, the document is successfully added, with a `201` status code.

##### Examples

- **POST** http://localhost:3000/module
```javascript
{
    "module_code": "CS3219",
    "module_name": "Software Engineering Principles and Patterns"
}
```

Expected Response:

*If document with module code CS3219 already exists*
```javascript
// STATUS CODE 400
{
    "message": "module: CS3219 already exists"
}
```

*Else*
```javascript
{
    "message": "module: CS3219 added"
}
```

#### **PUT** http://localhost:3000/module

##### Body keys
- module_code
- module_name

If the request body does not adhere to the format given above, a `400` is sent.

If there is no documents in the database collection with the matching module code, a `404` is sent, and no update is done.

If not, the document is successfully updated, with status code `200` sent.

##### Examples

- **PUT** http://localhost:3000/module
```javascript
{
    "module_code": "CS3219",
    "module_name": "Software Engineering"
}
```

Expected Response:

*If the document with the module code CS3219 does not exist*
```javascript
// STATUS CODE 404
{
    "message": "module: CS3219 does not exist"
}
```
*else*
```javascript
{
    "message": "module: CS3219 updated"
}
```

#### **DELETE** http://localhost:3000/module

##### Body keys
- module_code

If the request body does not adhere to the format given above, a `400` is sent.

If there is no documents in the database collection with the matching module code, a `404` is sent, and no delete is done.

If not, the document is successfully deleted, with a `200` status code sent.

##### Examples

- **DELETE** http://localhost:3000/module
```javascript
{
    "module_code": "CS3219"
}
```

Expected Response:

*If the document with the module code CS3219 does not exist*
```javascript
// STATUS CODE 404
{
    "message": "module: CS3219 does not exist"
}
```
*else*
```javascript
{
    "message": "module: CS3219 deleted"
}
```

