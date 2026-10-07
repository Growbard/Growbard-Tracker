import { NextResponse } from "next/server";
import { put, list } from "@vercel/blob";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BLOB_PATH = "growbard-data.json";
const token = process.env.BLOB_READ_WRITE_TOKEN;

// GET /api/data -> the shared dashboard data, or { data: null } if none yet.
export async function GET() {
  if (!token) return NextResponse.json({ data: null, shared: false });
  try {
    const { blobs } = await list({ prefix: BLOB_PATH, token });
    const found = blobs.find((b) => b.pathname === BLOB_PATH);
    if (!found) return NextResponse.json({ data: null, shared: true });
    // cache-bust so viewers always get the latest
    const res = await fetch(found.url + "?t=" + Date.now(), { cache: "no-store" });
    if (!res.ok) return NextResponse.json({ data: null, shared: true });
    const data = await res.json();
    return NextResponse.json({ data, shared: true });
  } catch {
    return NextResponse.json({ data: null, shared: false });
  }
}

// POST /api/data  body: the full dashboard data object -> saves it for everyone.
export async function POST(request: Request) {
  if (!token) return NextResponse.json({ ok: false, shared: false });
  try {
    const body = await request.text();
    if (!body || body.length > 4_000_000) {
      return NextResponse.json({ ok: false, error: "invalid payload" }, { status: 400 });
    }
    JSON.parse(body); // validate it's JSON
    await put(BLOB_PATH, body, {
      access: "public",
      contentType: "application/json",
      token,
      allowOverwrite: true,
      addRandomSuffix: false,
      cacheControlMaxAge: 0,
    });
    return NextResponse.json({ ok: true, shared: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
