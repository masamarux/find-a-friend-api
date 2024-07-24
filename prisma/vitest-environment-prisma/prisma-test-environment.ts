import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import type { Environment } from 'vitest'
import { randomUUID } from 'crypto'
import { execSync } from 'child_process'

const prisma = new PrismaClient()

function generateDatabaseURL(schema: string){
  if(!process.env.DATABASE_URL){
    throw new Error('Schema is required')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment>{
  name: 'custom',
  transformMode: 'ssr',
  async setup() {
    const schema = randomUUID()

    process.env.DATABASE_URL = generateDatabaseURL(schema)

    execSync(`npx prisma migrate deploy`)

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`
        )

        await prisma.$disconnect()
      }
    }
  }
}