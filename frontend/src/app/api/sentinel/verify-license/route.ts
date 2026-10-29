import { NextResponse } from "next/server";

export const validLicenses = [
  {
    key: "ZYNCOO-SNT-77A9-F2E1",
    clientName: "Tanvir Logistics & Cargo",
    plan: "Fleet & Transport Pro",
    maxVehicles: 5,
    activeVehicles: 3,
    status: "ACTIVE",
    expiresAt: "2099-12-31",
  },
  {
    key: "ZYNCOO-SNT-99B2-K811",
    clientName: "Shohagh Paribahan Network",
    plan: "Enterprise Transport Network",
    maxVehicles: 20,
    activeVehicles: 14,
    status: "ACTIVE",
    expiresAt: "2099-12-31",
  },
  {
    key: "ZYNCOO-SNT-11C4-M402",
    clientName: "Dr. Mahbub Alam",
    plan: "Personal Car Starter Kit",
    maxVehicles: 1,
    activeVehicles: 1,
    status: "ACTIVE",
    expiresAt: "2099-12-31",
  },
];

export async function POST(req: Request) {
  try {
    const { licenseKey, vehicleId } = await req.json();

    if (!licenseKey) {
      return NextResponse.json(
        { valid: false, error: "License key is required" },
        { status: 400 }
      );
    }

    const matched = validLicenses.find(
      (l) => l.key.toUpperCase() === licenseKey.trim().toUpperCase()
    );

    if (!matched) {
      return NextResponse.json({
        valid: false,
        error: "Invalid or expired Zyncoo Driver Sentinel License Key. Purchase a valid license from zyncoo.ai/sentinel",
      }, { status: 403 });
    }

    return NextResponse.json({
      valid: true,
      licenseKey: matched.key,
      clientName: matched.clientName,
      plan: matched.plan,
      status: matched.status,
      maxVehicles: matched.maxVehicles,
      vehicleId: vehicleId || "REGISTERED_VEHICLE",
      authorizedModules: [
        "468_face_mesh",
        "ear_eye_aspect_ratio",
        "dual_tone_siren",
        "bengali_voice_alerts",
        "obd2_speed_adaptation",
        "clahe_night_vision",
        "central_fleet_telemetry_stream"
      ],
      verifiedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json({ error: "License verification failed", details: error.message }, { status: 500 });
  }
}
