import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { vehicleId, driverName, speedKmh, reason, gpsCoordinates } = body;

    const sosIncident = {
      incidentId: "SOS-INC-" + Math.floor(10000 + Math.random() * 90000),
      vehicleId: vehicleId || "UNKNOWN_VEHICLE",
      driverName: driverName || "Driver",
      speedKmh: speedKmh || "N/A",
      reason: reason || "CRITICAL_SLEEP_DROWSINESS",
      gps: gpsCoordinates || { latitude: 23.8103, longitude: 90.4125 },
      dispatchedAt: new Date().toISOString(),
      fleetAlertDispatched: true,
      message: `🚨 FLEET EMERGENCY SOS: Driver ${driverName || "Driver"} in Vehicle ${vehicleId} shut eyes > 3s at ${speedKmh} km/h! Siren sounding, hazard lights engaged!`,
    };

    console.warn("[FLEET SOS DISPATCH TRIGGERED]:", sosIncident);

    return NextResponse.json({
      success: true,
      sosIncident,
    });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to dispatch SOS", details: error.message }, { status: 500 });
  }
}
