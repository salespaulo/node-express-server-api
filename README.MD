# Node Server API

A node http server with pre-configs to implement API Rest like serve
using Node Http (https://nodejs.org/api/http.html) or extends its.

## Config

``` json
{
    "server": {
        "name": "node-express-server-api",
        "version": "1.0.0",
        "running": true
    },  
    "logger": {
        "console": {
            "level": "debug"
        },
        "file": {
            "level": "error",
            "path": "./node-express-server-api.log"
        },
        "elasticsearch": {
            "indexPrefix": "node-express-server-api"
        }
    }
}
```

## Dependencies

What node libraries uses to config server.

### Commons

* **[option-js](https://www.npmjs.com/package/option-js)**: Scala like Optional[T]
* **[moment](https://momentjs.com)**: Date time library.

### Sys config

* **[config](https://www.npmjs.com/package/config)**: Easy system configs environment target.

### Logging

* **[winston](https://github.com/winstonjs/winston)**: Easy logging transformers.
* **[winston-elasticsearch](https://www.npmjs.com/package/winston-elasticsearch)**: Optional Elasticsearch logging config.
* **[morgan](https://www.npmjs.com/package/morgan)**: Easy Http Server logging.
