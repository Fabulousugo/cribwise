// app/api/report/create/route.ts
import { NextResponse } from "next/server"

// optional: choose runtime
export const runtime = "nodejs" // or "edge"

// optional: if you need dynamic (no caching)
export const dynamic = "force-dynamic"

// CORS preflight (optional, if you call from browsers across origins)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  })
}

export async function POST(req: Request) {
  try {
    const data = await req.json()

    // TODO: validate & persist data here
    // e.g. const parsed = schema.parse(data)

    return NextResponse.json({ ok: true, data }, {
      headers: { "Access-Control-Allow-Origin": "*" },
    })
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
    )
  }
}
