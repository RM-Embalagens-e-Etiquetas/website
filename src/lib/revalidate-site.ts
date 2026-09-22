/** Atualiza as páginas públicas depois de uma mudança no painel. */
export async function revalidatePublicSite() {
  try {
    const { revalidatePath } = await import('next/cache')
    revalidatePath('/', 'layout')
  } catch {
    // Script ou build: a próxima publicação gera as páginas de novo.
  }
}
