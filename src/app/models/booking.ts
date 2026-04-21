export interface Booking {
  id: number;
  bookingDate: string;
  bookingStatus: string;

  schedule: {
    id: number;
    scheduleDate: string;

    departureTime: {
      hour: number;
      minute: number;
      second: number;
      nano: number;
    };

    totalSeats: number;
    availableSeats: number;

    route: {
      id: number;
      source: string;
      destination: string;
    };

    bus: {
      id: number;
      busNumber: string;
      busType: string;
      totalSeats: number;
    };
  };

  passengers: {
    id: number;
    name: string;
    age: number;
    seatNo: number;
  }[];
}
