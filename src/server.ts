/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-console */
import app from './app'
import config from './config/config'
import dbConfig from './config/db-config'

const startServer = async () => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const connection = await dbConfig.connect()
        console.info(`Connected to database: ${connection.name}`)

        const server = app.listen(config.PORT, () => {
            console.info(`Server is running on ${config.SERVER_URL}`)
        })

        // Graceful shutdown handler
        process.on('SIGTERM', () => {
            console.info('SIGTERM signal received: closing HTTP server')
            server.close((err) => {
                if (err) {
                    console.error(`Error during server shutdown: ${err}`)
                }
                process.exit(0)
            })
        })

        process.on('SIGINT', () => {
            console.info('SIGINT signal received: closing HTTP server')
            server.close((err) => {
                if (err) {
                    console.error(`Error during server shutdown: ${err}`)
                }
                process.exit(0)
            })
        })
    } catch (error) {
        console.error('Error occurred during server startup', error)
        process.exit(1) // Exit the process with a failure code
    }
}

startServer()

