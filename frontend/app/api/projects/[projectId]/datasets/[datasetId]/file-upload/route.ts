import { authOptions } from '@/lib/auth';
import { fetcher } from '@/lib/utils';
import { getServerSession } from 'next-auth';
import { type NextRequest } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: { projectId: string; datasetId: string } }
): Promise<Response> {
  const projectId = params.projectId;
  const datasetId = params.datasetId;
  const session = await getServerSession(authOptions);
  const user = session!.user;

  const data = await req.formData();

  const res = await fetcher(
    `/projects/${projectId}/datasets/${datasetId}/file-upload`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.apiKey}`
      },
      body: data
    }
  );

  return res;
}
