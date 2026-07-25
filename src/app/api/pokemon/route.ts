import { NextResponse } from "next/server";

const URLBase = process.env.URL_BASE;

export interface DataType {
  count: number;
  next: string;
  previous: string;
  results: { name: string; url: string }[];
}

export async function GET() {
  const res = await fetch(`${URLBase}/pokemon`);

  const data: DataType = await res.json();

  if (!res.ok) {
    return NextResponse.json({ error: "Erro de API" }, { status: res.status });
  }

  return NextResponse.json(data);
}
