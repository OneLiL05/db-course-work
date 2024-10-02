import { getApp } from './app.js'

const bootstrap = async () => {
  try {
    const app = await getApp()

    app.listen({
      port: 8080,
    })
  } catch (error: unknown) {
    console.warn(error)
    process.exit(1)
  }
}

void bootstrap()
