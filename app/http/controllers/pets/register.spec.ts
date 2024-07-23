import { app } from '@/app';
import request from 'supertest';
import { afterAll, beforeAll, describe, it } from 'vitest';

describe('', () => {
  beforeAll(async () => {
    await app.ready();
  })

  afterAll(async () => {
    await app.close();
  });

  it.skip('', async () => {})
})