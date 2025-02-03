import { Ride } from "../../domain/entities/Ride";
import { DatabaseI } from "../database/Database";

export interface RideRepositoryI {
  save(ride: Ride): Promise<number>;
}

export class RideRepository implements RideRepositoryI {
  constructor(private database: DatabaseI) {}

  async save(ride: Ride): Promise<number> {
    const [{ ride_id }] = await this.database.query("insert into online_taxi.ride (ride_id, passenger_id, status, requested_at) values ($1, $2, $3, $4) returning ride_id", [ride.getRideId(), ride.getPassengerId(), ride.getStatus(), ride.getRequestedAt()]);
    return ride_id;
  }
}
