module.exports = {
    apps : [
        {
          name: "myapp",
          script: "./dist/index.js",
          watch: true,
          instances:2,
          instance_var: 'PM2_ID',
          env: {
              "NODE_ENV": "dev"
          }
        }
    ]
  }