import { vi, beforeEach, afterAll } from 'vitest';

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

import fs from 'fs';
import path from 'path';

process.env.DB_FILE = 'test.db';

import db from '@/lib/db';

beforeEach(() => {
  db.exec('DELETE FROM tasks');
});

afterAll(() => {
  db.close();

  const TEST_DB_PATH = path.join(process.cwd(), 'data', 'test.db');
  for (const ext of ['', '-wal', '-shm']) {
    const file = TEST_DB_PATH + ext;
    if (fs.existsSync(file)) fs.unlinkSync(file);
  }
});