export interface Lead {
  nombre: string
  telefono?: string
  correo?: string
  motivo: string
  mensaje?: string
}

const LEADS_URL = import.meta.env.VITE_LEADS_URL as string | undefined

export async function enviarLead(lead: Lead): Promise<boolean> {
  if (!LEADS_URL) return false

  try {
    const res = await fetch(LEADS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...lead, origen: 'web', fecha: new Date().toISOString() }),
    })
    return res.ok
  } catch {
    return false
  }
}
