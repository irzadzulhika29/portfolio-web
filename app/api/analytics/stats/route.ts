import { NextResponse } from "next/server";

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const READ_TOKEN = process.env.ANALYTICS_READ_TOKEN;
const KEY_PREFIX = "portfolio:analytics";

type RedisPipelineItem = {
  result?: unknown;
  error?: string;
};

async function redisPipeline(commands: unknown[][]) {
  if (!REDIS_URL || !REDIS_TOKEN) {
    return null;
  }

  const response = await fetch(`${REDIS_URL}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commands),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to read analytics stats");
  }

  return (await response.json()) as RedisPipelineItem[];
}

function toNumber(value: unknown) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const bearerToken = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const providedToken = bearerToken || url.searchParams.get("token");

  if (!READ_TOKEN || providedToken !== READ_TOKEN) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const now = new Date();
  const day = now.toISOString().slice(0, 10);
  const month = day.slice(0, 7);

  const results = await redisPipeline([
    ["GET", `${KEY_PREFIX}:pageviews:total`],
    ["GET", `${KEY_PREFIX}:pageviews:day:${day}`],
    ["GET", `${KEY_PREFIX}:pageviews:month:${month}`],
    ["SCARD", `${KEY_PREFIX}:visitors:all`],
    ["SCARD", `${KEY_PREFIX}:visitors:day:${day}`],
    ["SCARD", `${KEY_PREFIX}:visitors:month:${month}`],
    ["GET", `${KEY_PREFIX}:instagram:pageviews`],
    ["SCARD", `${KEY_PREFIX}:instagram:visitors`],
    ["HGETALL", `${KEY_PREFIX}:paths`],
  ]);

  if (!results) {
    return NextResponse.json({
      ok: true,
      configured: false,
      message: "Analytics storage is not configured.",
    });
  }

  const topPaths = Array.isArray(results[8]?.result)
    ? (results[8].result as string[])
        .reduce<{ path: string; pageviews: number }[]>((acc, value, index, array) => {
          if (index % 2 === 0) {
            acc.push({ path: value, pageviews: toNumber(array[index + 1]) });
          }

          return acc;
        }, [])
        .sort((a, b) => b.pageviews - a.pageviews)
        .slice(0, 10)
    : [];

  return NextResponse.json({
    ok: true,
    configured: true,
    period: { day, month },
    pageviews: {
      total: toNumber(results[0]?.result),
      today: toNumber(results[1]?.result),
      thisMonth: toNumber(results[2]?.result),
      instagram: toNumber(results[6]?.result),
    },
    visitors: {
      total: toNumber(results[3]?.result),
      today: toNumber(results[4]?.result),
      thisMonth: toNumber(results[5]?.result),
      instagram: toNumber(results[7]?.result),
    },
    topPaths,
  });
}
