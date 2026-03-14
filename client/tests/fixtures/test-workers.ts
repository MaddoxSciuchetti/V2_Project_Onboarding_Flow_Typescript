import { WorkerFixture } from '../types';

export function createWorkerFixture(): WorkerFixture {
  const timestamp = Date.now();
  const firstName = 'Onboarding';
  const lastName = `Worker${timestamp}`;

  return {
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    email: `onboarding-worker-${timestamp}@example.com`,
    birthDate: '14.03.1998',
    address: 'Musterstrasse 14',
    entryDate: '14.03.2026',
    position: 'Elektriker',
  };
}
