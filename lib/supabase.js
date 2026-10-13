import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function uploadImage(file) {
  const sanitizedName = file.name.replace(/\s+/g, '-')
  const filename = `${Date.now()}-${sanitizedName}`
  const { data, error } = await supabase.storage
    .from('portfolio-media')
    .upload(filename, file)
  if (error) throw error
  const { data: { publicUrl } } = supabase.storage
    .from('portfolio-media')
    .getPublicUrl(filename)
  return publicUrl
}
