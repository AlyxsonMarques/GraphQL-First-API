import {
  Query,
  Resolver,
  Mutation,
  Arg,
  FieldResolver,
  Root,
} from "type-graphql";
import { CreateAppointmentInput } from "../dtos/inputs/create-appointment-input";
import { AppointmentModel } from "../dtos/models/appointment-model";
import { CustomerModel } from "../dtos/models/customer-model";

const appointments: AppointmentModel[] = [];

@Resolver(() => AppointmentModel)
export class AppointmentsResolver {
  @Query(() => [AppointmentModel])
  async appointments() {
    return appointments;
  }

  @Mutation(() => AppointmentModel)
  async createAppointment(@Arg("data") data: CreateAppointmentInput) {
    const appointment = {
      startsAt: data.startsAt,
      endsAt: data.endsAt,
    };

    appointments.push(appointment);

    return appointment;
  }

  @FieldResolver(() => CustomerModel)
  async customer(@Root() appointment: AppointmentModel) {
    return {
      name: "John Doe",
    };
  }
}
