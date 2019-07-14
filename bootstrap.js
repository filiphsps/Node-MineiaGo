const register = require('@babel/register').default;
register({
    "extensions": [
        ".js",
        ".ts",
    ]
});

require('./src/server');
