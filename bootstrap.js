const register = require('@babel/register').default;
register({
    "extensions": [
        ".js",
        ".jsx",
        ".ts",
        ".tsx"
    ]
});

require('./src/server');
