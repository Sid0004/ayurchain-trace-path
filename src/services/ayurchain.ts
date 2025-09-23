import { neon, neonConfig } from '@neondatabase/serverless';

const neonDatabaseUrl = (import.meta.env.VITE_NEON_DATABASE_URL as string | undefined)
  || (import.meta.env.VITE_NEON_DB_URL as string | undefined);
const useNeonDirect = String(
  (import.meta.env.VITE_USE_NEON_DIRECT as string | undefined)
  ?? (neonDatabaseUrl ? 'true' : 'false')
) === 'true';

// Bind global fetch for the Neon serverless driver (browser-safe)
neonConfig.fetchConnectionCache = true;
// In browsers, global fetch exists. This line keeps types happy in SSR/build tools.
// @ts-ignore
neonConfig.fetch = (input: RequestInfo, init?: RequestInit) => fetch(input as any, init);

const resolvedApiBase = (() => {
  const envBase = import.meta.env.VITE_API_BASE_URL as string | undefined;
  const isProduction = import.meta.env.PROD === true;

  if (envBase && envBase.length > 0) return envBase.replace(/\/$/, '');

  if (isProduction) {
    throw new Error(
      'VITE_API_BASE_URL is not set. Please configure it in your environment (.env).'
    );
  }

  // Development fallback
  return 'http://localhost:3000';
})();

export interface HerbBatch {
  batchID: string;
  species: string;
  farmerID: string;
  cultivationLocation: string;
  harvestDate: string;
  currentOwner: string;
  ownerHistory: any;
  processingSteps: any;
  createdAt: string;
  updatedAt: string;
}

async function neonFetchBatches(): Promise<HerbBatch[]> {
  if (!neonDatabaseUrl) throw new Error('VITE_NEON_DATABASE_URL not set');
  const sql = neon(neonDatabaseUrl);
  const rows = await sql`
    select
      batch_id as "batchID",
      species,
      farmer_id as "farmerID",
      cultivation_location as "cultivationLocation",
      harvest_date as "harvestDate",
      current_owner as "currentOwner",
      owner_history as "ownerHistory",
      processing_steps as "processingSteps",
      created_at as "createdAt",
      updated_at as "updatedAt"
    from herb_batches
    order by created_at desc
  `;
  return rows as unknown as HerbBatch[];
}

export async function fetchBatches(): Promise<HerbBatch[]> {
  if (useNeonDirect) {
    return neonFetchBatches();
  }
  const res = await fetch(`${resolvedApiBase}/api/batches`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to fetch batches: ${res.status}`);
  return res.json();
}

async function neonFetchBatchById(id: string): Promise<HerbBatch | null> {
  if (!neonDatabaseUrl) throw new Error('VITE_NEON_DATABASE_URL not set');
  const sql = neon(neonDatabaseUrl);
  const rows = await sql`
    select
      batch_id as "batchID",
      species,
      farmer_id as "farmerID",
      cultivation_location as "cultivationLocation",
      harvest_date as "harvestDate",
      current_owner as "currentOwner",
      owner_history as "ownerHistory",
      processing_steps as "processingSteps",
      created_at as "createdAt",
      updated_at as "updatedAt"
    from herb_batches
    where batch_id = ${id}
    limit 1
  `;
  const first = (rows as unknown as HerbBatch[])[0];
  return first || null;
}

export async function fetchBatchById(id: string): Promise<HerbBatch | null> {
  if (useNeonDirect) {
    return neonFetchBatchById(id);
  }
  const res = await fetch(`${resolvedApiBase}/api/batches/${id}`, { cache: 'no-store' });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to fetch batch: ${res.status}`);
  return res.json();
}


