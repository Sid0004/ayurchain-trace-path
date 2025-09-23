import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { fetchBatchById, type HerbBatch } from '@/services/ayurchain';
import { ArrowLeft, Package, User, MapPin, Calendar, Clock } from 'lucide-react';

const BatchDetails = () => {
  const { id } = useParams();
  const [batch, setBatch] = useState<HerbBatch | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError('');
    fetchBatchById(id)
      .then((res) => {
        if (!res) {
          setError('Batch not found');
          setBatch(null);
        } else {
          setBatch(res);
        }
      })
      .catch(() => setError('Failed to load batch'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading…</div>;
  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
      <div className="text-red-600">{error}</div>
      <Link to="/regulator-dashboard"><Button variant="outline">Back to Dashboard</Button></Link>
    </div>
  );
  if (!batch) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <Link to="/regulator-dashboard">
            <Button variant="ghost" className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
          </Link>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="w-5 h-5" />
              <span>Batch {batch.batchID}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center"><span className="font-medium w-40">Species</span><span>{batch.species}</span></div>
                <div className="flex items-center"><User className="w-4 h-4 mr-2" /><span className="font-medium w-40">Farmer ID</span><span>{batch.farmerID}</span></div>
                <div className="flex items-center"><MapPin className="w-4 h-4 mr-2" /><span className="font-medium w-40">Origin</span><span>{batch.cultivationLocation}</span></div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center"><Calendar className="w-4 h-4 mr-2" /><span className="font-medium w-40">Harvest Date</span><span>{new Date(batch.harvestDate).toLocaleDateString()}</span></div>
                <div className="flex items-center"><span className="font-medium w-40">Current Owner</span><span>{batch.currentOwner}</span></div>
                <div className="flex items-center"><Clock className="w-4 h-4 mr-2" /><span className="font-medium w-40">Created</span><span>{new Date(batch.createdAt).toLocaleString()}</span></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Owner History</CardTitle>
            </CardHeader>
            <CardContent>
              {Array.isArray(batch.ownerHistory) && batch.ownerHistory.length > 0 ? (
                <div className="space-y-3">
                  {batch.ownerHistory.map((e: any, idx: number) => (
                    <div key={idx} className="p-3 rounded border">
                      <div className="text-sm">{e.owner || e.name || 'Owner'}{e.timestamp ? ` • ${new Date(e.timestamp).toLocaleString()}` : ''}</div>
                      {e.note && <div className="text-xs text-muted-foreground">{e.note}</div>}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">No owner history available.</div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Processing Steps</CardTitle>
            </CardHeader>
            <CardContent>
              {Array.isArray(batch.processingSteps) && batch.processingSteps.length > 0 ? (
                <div className="space-y-3">
                  {batch.processingSteps.map((s: any, idx: number) => (
                    <div key={idx} className="p-3 rounded border">
                      <div className="font-medium">{s.step || s.name || `Step ${idx + 1}`}</div>
                      {s.details && <div className="text-sm text-muted-foreground">{s.details}</div>}
                      {s.timestamp && <div className="text-xs">{new Date(s.timestamp).toLocaleString()}</div>}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">No processing steps available.</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BatchDetails;


