import { supabase } from "@/lib/supabase"

export default async function TestPage() {
  const { data, error } = await supabase
    .from('properties')
    .select('*')

  if (error) {
    return <div className="p-8">❌ Error: {error.message}</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">✅ Database Connected!</h1>
      <p>Found {data.length} properties</p>
      <pre className="bg-slate-100 p-4 rounded mt-4">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}