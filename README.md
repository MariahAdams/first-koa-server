# First Koa Server

## Project Description
Sandbox to explore Koa. 

## Technologies
Node, [Koa](https://github.com/koajs/koa), Mongoose, Jest

### How to get started
* Fork repository, clone locally, navigate to repository directory,
* Download all the files with `npm i`,
* To test, run `npm test`. 

### Developer
* Create your own .env files with the .env.example files provided in the root of the project and the test folder. Enter the correct MongoDB URI. Default port is set to 3000, you may update it to your port of choice.
* Connect to server with `npm run start`.
* Enter `http://localhost:3000/koalas` in your browser.
* This RESTful Koala API includes the following methods:

Method | Path
---|---
`GET` |     `/koalas`
`GET` |     `/koalas/:id`
`POST` |    `/koalas`
`PUT` |     `/koalas/:id`
`DELETE` |  `/koalas/:id`

### Helpful Resources
* [Koa's examples](https://github.com/koajs/examples)
* [Koa router](https://github.com/ZijianHe/koa-router)
* [Async/Await with Mongoose](http://thecodebarbarian.com/using-async-await-with-mocha-express-and-mongoose)
* [Testing asynchronous code with Jest](https://jestjs.io/docs/en/asynchronous)
* [Debugging asynchronous code](https://codeburst.io/debugging-asynchronous-javascipt-ed993073aeb6)

## Contributor
[Mariah Adams](https://github.com/MariahAdams)

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
