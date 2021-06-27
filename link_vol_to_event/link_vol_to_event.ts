
// This only goes one way -> volunteer signing up thru a form automatically links to volunteer to event
await main()
async function main() {

    let volunteerTable = base.getTable("Volunteers");
    let volunteers = await volunteerTable.selectRecordsAsync();
    let volunteerId = input.config().updatedRecordId
    let record = volunteers.getRecord(volunteerId);
    let eventNamesToLink = getMissingRsvps(record)
    if (eventNamesToLink.length == 0) {
        console.log("No need to update anything, exiting")
        return
    }

    // Find the corresponding events, from the names
    let eventTable = base.getTable("Events");
    let eventRecords = await eventTable.selectRecordsAsync();

    let events = eventRecords.records.filter(record => {
        let name = record.getCellValue("Event Name");
        return eventNamesToLink.includes(name)
    });
    let rsvps = record.getCellValue("RSVPs") || []
    let updatedRsvps = rsvps.concat(events)
    console.log("updating rsvps to", updatedRsvps)

    volunteerTable.updateRecordAsync(record, {
        RSVPs : updatedRsvps
    })

    let eventParticipationTable = base.getTable("Event Attendance + Results");
    
    events.map(event => {
        eventParticipationTable.createRecordAsync({
            "Volunteer" : [ {"id": volunteerId } ],
            "Event": [ {"id": event.id } ],
        });
    })
}

// Find all events listed in "Events from Sign-Up Form" & "all_rsvps_unlinked", but not in "RSVPs"
// Returns EventIds
function getMissingRsvps(record) {
    let signupEventsSplit = record.getCellValue("Events from Sign-Up Form").toString().split(',').filter(it => it.length > 0);
    let dedupedEventNames = new Set();
    for (let item in signupEventsSplit) {
       dedupedEventNames.add(signupEventsSplit[item].trim())
    }
    if (record.getCellValue("all_rsvps_unlinked") != null) {
        let allRsvpsUnlinkedSplit = record.getCellValue("all_rsvps_unlinked").toString().split(',').filter(it => it.length > 0);
        for (let item in allRsvpsUnlinkedSplit) {
            dedupedEventNames.add(allRsvpsUnlinkedSplit[item].trim())
        }
    }
    let rsvps = record.getCellValue("RSVPs")
    let rsvpEventNames
    if (rsvps == null) {
        rsvpEventNames = new Set()
    } else {
        rsvpEventNames = new Set(rsvps.map(rsvp => rsvp.name))
    }

    let diff = difference(dedupedEventNames, rsvpEventNames)
    console.log("Need to add RSVPs for ", diff)
    return Array.from(diff)
}

function difference(setA, setB) {
    let _difference = new Set(setA)
    for (let elem of setB) {
        _difference.delete(elem)
    }
    return _difference
}