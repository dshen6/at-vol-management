// input: signup form record that matches trigger
// output: NameAndGCalendarInfo, a rollup of relevant info for the events they signed up for
await main()
async function main() {
    let inputConfig = input.config();

    let events = await getEventRecordsFromRsvps(inputConfig.recordId)
    let info = events.map(event => event.getCellValue("NameAndGCalendarInfo")).join('\n')
    output.set("NameAndGCalendarInfo", info)
}

async function getEventRecordsFromRsvps(recordId) {
    let signupTable = base.getTable("Sign Up Forms");
    let signUps = await signupTable.selectRecordsAsync();
    let updatedRecord = signUps.getRecord(recordId)
    if (updatedRecord == null) {
        return null
    }
    let eventsFromForm = []
    if (updatedRecord.getCellValue("RSVPing") != null) {
        updatedRecord.getCellValue("RSVPing").forEach(it => {
            if (!eventsFromForm.includes(it)) {
                eventsFromForm.push(it)
            }
        })
    }

    if (eventsFromForm === null || eventsFromForm.length === 0) {
        // if we don't have any RSVPs, do nothing
        return null
    }
    
    let eventTable = base.getTable("Events");
    let eventRecords = await eventTable.selectRecordsAsync( {
        sorts: [ 
            {field: "Date and Start Time"}
        ]
    });
    let eventNames = eventsFromForm.map(it => it.name)
    let events = eventRecords.records.filter(record => {
        let name = record.getCellValueAsString("Event Name")
        let isPhoneBank = name.toLowerCase().includes("phone")
        return eventNames.includes(name) && isPhoneBank
    })

    if (events.length === 0 && eventsFromForm.length !== 0) {
        // Event name is malformed, because we couldn't find a matching event
        let errorMessage = "Couldn't find a matching event for " + eventNames.join()
        output.set("InputError", errorMessage);
    }

    return events
}
