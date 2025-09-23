const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

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

export async function fetchBatches(): Promise<HerbBatch[]> {
  const res = await fetch(`${API}/api/batches`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to fetch batches: ${res.status}`);
  return res.json();
}

export async function fetchBatchById(id: string): Promise<HerbBatch | null> {
  const res = await fetch(`${API}/api/batches/${id}`, { cache: 'no-store' });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to fetch batch: ${res.status}`);
  return res.json();
}


