import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { ConsentRecord } from "@factandfiction/consent-manager";

/**
 * POST /api/consent-audit
 *
 * Receives consent records from the client and persists them for GDPR
 * audit trail purposes. Swap the storage implementation for your DB of choice.
 *
 * This endpoint is optional — only needed if you pass `auditEndpoint`
 * in your ConsentConfig.
 */
export async function POST(request: NextRequest) {
  try {
    const record = (await request.json()) as ConsentRecord;

    // Basic validation
    if (!record.version || !record.timestamp || !record.preferences) {
      return NextResponse.json(
        { error: "Invalid consent record" },
        { status: 400 },
      );
    }

    // Enrich with server-side data the client can't be trusted to provide
    const enriched = {
      ...record,
      ip:
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
        "unknown",
      country:
        request.headers.get("x-vercel-ip-country") ??
        request.headers.get("cf-ipcountry") ??
        "unknown",
      receivedAt: new Date().toISOString(),
    };

    // ── Storage: replace with your implementation ──────────────────────────
    //
    // Option A: Postgres / Supabase
    // await db.insert(consentAuditTable).values(enriched)
    //
    // Option B: Prisma
    // await prisma.consentAudit.create({ data: enriched })
    //
    // Option C: MongoDB
    // await db.collection('consent_audit').insertOne(enriched)
    //
    // Option D: Simple log to stdout (works with log aggregators like Datadog)
    console.log("[consent-audit]", JSON.stringify(enriched));
    // ──────────────────────────────────────────────────────────────────────

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("[consent-audit] error:", err);
    // Return 200 anyway — never let audit logging break the client UX
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
