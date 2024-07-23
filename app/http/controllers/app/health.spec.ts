import { app } from '@/app';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Health check (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  })

  afterAll(async () => {
    await app.close();
  });

  it('should return status ok', async () => {
    const response = await request(app.server).get('/health').send();
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  })
})