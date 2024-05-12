module.exports = {
  apps : [{
    name: "server",
    script: './dist/server.js',
    watch:  true,
    env:{
	"PORT": 3001,
	"SECRET_KEY": "m>!%Hz{pB7iM`!,{nE>yft]^@Z%dm=",
	"DATABASE_NAME": "hosstess",
	"DATABASE_URI": "mongodb+srv://hosstess:u1piHxtM8XkQqSri@hosstess.ol2dhj7.mongodb.net/?retryWrites=true&w=majority&appName=hosstess"
    }
  }]
};
