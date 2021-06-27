## When someone rsvps via signup form, link volunteer to event
This automation saves the glue work of having to manually link a Volunteer to an Event.
- Depends on an `all_rsvps_unlinked` lookup in the Volunteer table.
- See trigger, `link_vol_to_event.ts`, and `all_rsvps_unlinked` formula