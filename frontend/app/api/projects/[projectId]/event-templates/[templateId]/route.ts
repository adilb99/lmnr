import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { fetcher } from '@/lib/utils';

export async function POST(req: Request, { params }: { params: { projectId: string, templateId: string } }): Promise<Response> {

  const projectId = params.projectId;
  const templateId = params.templateId;

  const session = await getServerSession(authOptions)
  const user = session!.user

  const body = await req.json()

  const res = await fetcher(`/projects/${projectId}/event-templates/${templateId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.apiKey}`
    },
    body: JSON.stringify(body)
  })

  return res
}

export async function DELETE(req: Request, { params }: { params: { projectId: string, templateId: string } }): Promise<Response> {

  const projectId = params.projectId;
  const templateId = params.templateId;

  const session = await getServerSession(authOptions)
  const user = session!.user

  const res = await fetcher(`/projects/${projectId}/event-templates/${templateId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.apiKey}`
    }
  })

  return res
}
