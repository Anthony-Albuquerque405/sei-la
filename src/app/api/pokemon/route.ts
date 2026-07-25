import { NextRequest, NextResponse } from "next/server";

const URLBase = process.env.URL_BASE;

export interface DataType {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}

export async function GET(req: NextRequest) {
  const limit = req.nextUrl.searchParams.get("limit") || "20";
  const offset = req.nextUrl.searchParams.get("offset") || "0";

  const res = await fetch(`${URLBase}/pokemon?limit=${limit}&offset=${offset}`);

  const data: DataType = await res.json();

  if (!res.ok) {
    return NextResponse.json({ error: "Erro de API" }, { status: res.status });
  }

  return NextResponse.json(data);
}
