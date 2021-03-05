module.exports = () => {
    const config = {} 
    
    config.opts = {
        path: '/',
        maxAge: 1000*60*60*24*30,
        httpOnly: false,
        domain: '121.4.215.189'
    }
    return config
}