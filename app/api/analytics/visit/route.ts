import { NextResponse } from "next/server";

type VisitPayload = {
  visitorId?: string;
  path?: string;
  referrer?: string;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmContent?: string | null;
  trackedAt?: string;
};

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const KEY_PREFIX = "portfolio:analytics";

function clean(value: unknown, fallback = "unknown", max = 240) {
  if (typeof value !== "string") {
    return fallback;
  }

  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, max) : fallback;
}

function normalizeSource(source: unknown, referrer: unknown) {
  const utmSource = clean(source, "", 80).toLowerCase();
  if (utmSource) {
    return utmSource;
  }

  const ref = clean(referrer, "", 240).toLowerCase();
  if (ref.includes("instagram.com") || ref.includes("l.instagram.com")) {
    return "instagram";
  }

  return "direct";
}

function isInstagramSource(source: string) {
  return source === "ig" || source === "instagram" || source.includes("instagram");
}

async function redisPipeline(commands: unknown[][]) {
  if (!REDIS_URL || !REDIS_TOKEN) {
    return;
  }

  await fetch(`${REDIS_URL}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commands),
    cache: "no-store",
  });
}

export async function POST(request: Request) {
  let payload: VisitPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const visitorId = clean(payload.visitorId, "", 120);
  if (!visitorId) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const now = new Date();
  const day = now.toISOString().slice(0, 10);
  const month = day.slice(0, 7);
  const source = normalizeSource(payload.utmSource, payload.referrer);
  const path = clean(payload.path, "/", 240);
  const sourceKey = source.replace(/[^a-z0-9_-]/g, "_");

  const commands: unknown[][] = [
    ["INCR", `${KEY_PREFIX}:pageviews:total`],
    ["INCR", `${KEY_PREFIX}:pageviews:day:${day}`],
    ["INCR", `${KEY_PREFIX}:pageviews:month:${month}`],
    ["SADD", `${KEY_PREFIX}:visitors:all`, visitorId],
    ["SADD", `${KEY_PREFIX}:visitors:day:${day}`, visitorId],
    ["SADD", `${KEY_PREFIX}:visitors:month:${month}`, visitorId],
    ["INCR", `${KEY_PREFIX}:source:${sourceKey}:pageviews`],
    ["SADD", `${KEY_PREFIX}:source:${sourceKey}:visitors`, visitorId],
    ["HINCRBY", `${KEY_PREFIX}:paths`, path, 1],
  ];

  if (isInstagramSource(source)) {
    commands.push(
      ["INCR", `${KEY_PREFIX}:instagram:pageviews`],
      ["SADD", `${KEY_PREFIX}:instagram:visitors`, visitorId]
    );
  }

  await redisPipeline(commands);

  return NextResponse.json({ ok: true, configured: Boolean(REDIS_URL && REDIS_TOKEN) });
}
