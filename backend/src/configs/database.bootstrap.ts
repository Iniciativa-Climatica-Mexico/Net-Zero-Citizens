// import all the files from .bootstrap and run them
import { readdir } from 'fs/promises'
import { join } from 'path'
import { Bootstrapper } from '../bootstrap/Bootstraper'

const bootstrapDirs = join(__dirname, '../bootstrap')

export const bootstrapDB = async () => {
  try {
    const files = await readdir(bootstrapDirs)
    const pool: Promise<void>[] = []
    for (const file of files) {
      if (file.endsWith('.bootstrap.ts') || file.endsWith('.bootstrap.js')) {
        const { default: bootstrapper } = await import(
          join(bootstrapDirs, file)
        )
        if (bootstrapper.prototype instanceof Bootstrapper) {
          const instance = new bootstrapper()
          pool.push(instance.run())
        }
      }
    }
    await Promise.all(pool)
    console.log('Database bootstrapped')
  } catch (error) {
    console.error('Unable to bootstrap database:', error)
  }
}