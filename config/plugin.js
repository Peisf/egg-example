module.exports = {

    onerror: {
        enable: true
    },
    
    nunjucks: {
        enable: true,
        package: 'egg-view-nunjucks'
    },

    schedule: {
        enable: true,
        package: 'egg-schedule'
    },

    validate: {
        enable: true,
        package: 'egg-validate'
    },
    sequelize: {
        enable: true, 
        package: 'egg-sequelize', 
    },

    mysql: {
        enable: true,
        package: 'egg-mysql'
    },

    jwt: {
        enable: true,
        package: 'egg-jwt'
    },

    routerPlus: {
        enable: true,
        package: 'egg-router-plus'
    },

    passport: {
        enable: true,
        package: 'egg-passport'
    },

    passportLocal: {
        enable: true,
        package: 'egg-passport-local'
    },

    //跨域
    cors: {
        enable: true,
        package: 'egg-cors'
    },

    swaggerdoc: {
        enable: true,
        package: 'egg-swagger-doc'
    }
}