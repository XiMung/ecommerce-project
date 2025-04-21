

export default(): any => ({
    port: Number(process.env.PORT),
    env: process.env.NODE_ENV || 'development',
})