"""Highway Rest-Stop, Fuel Pump, and Fatigue Haven Navigation Locator."""
from typing import List, Dict, Any

# Simulated highway stations along major corridors (Dhaka-Chittagong / North Bengal Highway)
HIGHWAY_REST_STOPS = [
    {
        "id": "RS-101",
        "name": "Padma Highway Rest Area & Cafe",
        "type": "Rest Area & Tea Stall",
        "distance_km": 1.4,
        "eta_mins": 3,
        "amenities": ["Hot Tea/Coffee", "Driver Rest Bunk", "24/7 Washroom", "Parking"],
        "rating": 4.8
    },
    {
        "id": "RS-102",
        "name": "Meghna Fuel & Highway Hub",
        "type": "Petrol Pump & Food Court",
        "distance_km": 3.8,
        "eta_mins": 6,
        "amenities": ["Fuel/CNG", "Cafe & Snacks", "Prayer Room", "Tire Service"],
        "rating": 4.6
    },
    {
        "id": "RS-103",
        "name": "Comilla Highway Inn & Rest Stop",
        "type": "Hotel & Dining",
        "distance_km": 8.5,
        "eta_mins": 12,
        "amenities": ["Hot Meals", "Fresh Drinks", "Secure Parking", "ATM"],
        "rating": 4.5
    }
]


class RestStopLocatorService:
    def __init__(self):
        self.stations = HIGHWAY_REST_STOPS

    def get_nearest_stops(self, is_driver_fatigued: bool = False) -> List[Dict[str, Any]]:
        """Returns stations with dynamic distance adjustments."""
        return [
            {
                **s,
                "recommended": is_driver_fatigued and (s["distance_km"] < 4.0)
            }
            for s in self.stations
        ]


rest_stop_service = RestStopLocatorService()
