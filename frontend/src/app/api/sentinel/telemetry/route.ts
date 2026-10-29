import { NextResponse } from "next/server";

export interface VehicleTelemetryPacket {
  vehicleId: string;
  driverName: string;
  driverPhone?: string;
  vehicleModel?: string;
  speedKmh: number;
  ear: number;
  mar?: number;
  threatLevel: number; // 0 to 100
  status: "Safe & Awake" | "Drowsiness Warning" | "Critical Sleep Alarm" | "Phone Distraction";
  isAlarming: boolean;
  hazardActive: boolean;
  latitude: number;
  longitude: number;
  lastUpdated: string;
  licenseKey?: string;
}

// Global in-memory fleet state updated in real-time by IoT Drive Cameras
export const activeFleetTelemetry: Map<string, VehicleTelemetryPacket> = new Map([
  [
    "DHAKA-METRO-GA-11-2091",
    {
      vehicleId: "DHAKA-METRO-GA-11-2091",
      driverName: "রফিক মিয়া",
      driverPhone: "+880 1711-290011",
      vehicleModel: "Toyota HiAce (Logistics #1)",
      speedKmh: 72,
      ear: 0.31,
      mar: 0.22,
      threatLevel: 0,
      status: "Safe & Awake",
      isAlarming: false,
      hazardActive: false,
      latitude: 23.8103,
      longitude: 90.4125,
      lastUpdated: new Date().toISOString(),
      licenseKey: "ZYNCOO-SNT-77A9-F2E1",
    },
  ],
  [
    "DHAKA-METRO-CHA-53-9012",
    {
      vehicleId: "DHAKA-METRO-CHA-53-9012",
      driverName: "সেলিম শেখ",
      driverPhone: "+880 1819-440099",
      vehicleModel: "Hino 1J Bus (Route: Dhaka-Ctg)",
      speedKmh: 88,
      ear: 0.29,
      mar: 0.31,
      threatLevel: 10,
      status: "Safe & Awake",
      isAlarming: false,
      hazardActive: false,
      latitude: 23.6238,
      longitude: 90.5000,
      lastUpdated: new Date().toISOString(),
      licenseKey: "ZYNCOO-SNT-77A9-F2E1",
    },
  ],
  [
    "CHATTA-METRO-BA-12-4011",
    {
      vehicleId: "CHATTA-METRO-BA-12-4011",
      driverName: "কামরুল হাসান",
      driverPhone: "+880 1912-334455",
      vehicleModel: "Cover Van 3-Ton (Delivery Unit)",
      speedKmh: 65,
      ear: 0.14,
      mar: 0.68,
      threatLevel: 85,
      status: "Drowsiness Warning",
      isAlarming: true,
      hazardActive: true,
      latitude: 22.3569,
      longitude: 91.7832,
      lastUpdated: new Date().toISOString(),
      licenseKey: "ZYNCOO-SNT-99B2-K811",
    },
  ],
]);

// POST: Drive Camera sends telemetry over internet/API
export async function POST(req: Request) {
  try {
    const data: Partial<VehicleTelemetryPacket> = await req.json();

    if (!data.vehicleId) {
      return NextResponse.json({ error: "vehicleId is required" }, { status: 400 });
    }

    const packet: VehicleTelemetryPacket = {
      vehicleId: data.vehicleId,
      driverName: data.driverName || "Driver",
      driverPhone: data.driverPhone || "N/A",
      vehicleModel: data.vehicleModel || "Standard Vehicle",
      speedKmh: Number(data.speedKmh || 0),
      ear: Number(data.ear || 0.30),
      mar: Number(data.mar || 0.20),
      threatLevel: Number(data.threatLevel || 0),
      status: data.status || "Safe & Awake",
      isAlarming: Boolean(data.isAlarming),
      hazardActive: Boolean(data.hazardActive),
      latitude: Number(data.latitude || 23.8103),
      longitude: Number(data.longitude || 90.4125),
      lastUpdated: new Date().toISOString(),
      licenseKey: data.licenseKey || "UNREGISTERED",
    };

    activeFleetTelemetry.set(data.vehicleId, packet);

    return NextResponse.json({
      success: true,
      message: "Telemetry ingested successfully into Zyncoo Cloud Platform",
      vehicleId: data.vehicleId,
      status: packet.status,
      timestamp: packet.lastUpdated,
    });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to ingest telemetry", details: error.message }, { status: 500 });
  }
}

// GET: Dashboard or Admin fetches live telemetry
export async function GET() {
  const vehicles = Array.from(activeFleetTelemetry.values());
  return NextResponse.json({
    success: true,
    totalOnlineVehicles: vehicles.length,
    criticalThreats: vehicles.filter((v) => v.isAlarming).length,
    vehicles,
    timestamp: new Date().toISOString(),
  });
}
