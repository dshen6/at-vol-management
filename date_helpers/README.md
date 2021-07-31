

## Best Practice for Event Start/End Times
- For Start and End Times, use a `Date` field, and "include a time field"
- This gives automations multiple ways of parsing the time data

## Auto-generating a Gcal event reminder
- this generates a gcal link, with the location, time, and body of the calendar event filled out.
    - this is _not_ the same as inviting to an existing Google Calendar event
- this is taken from https://stackoverflow.com/questions/10763734/how-to-build-html-link-to-a-google-calendar-event

Here's an example formula:
```
"https://calendar.google.com/calendar/u/0/r/eventedit?dates=" &{FormattedIsoTime} & "&ctz=America/New_York&text=Make+Calls+For+Brandon+West&location" & ENCODE_URL_COMPONENT({Address}) & "details=Thanks+for+volunteering+to+phone+bank+for+Brandon+West!+Here%27s+the+Zoom:+bit.ly/brandon-phonebank&sf=true"
```
- which generates this link for a particular event:
https://calendar.google.com/calendar/u/0/r/eventedit?dates=20210114T180000/20210114T200000&ctz=America/New_York&text=Make+Calls+For+Brandon+West&location=Your+Home&details=Thanks+for+volunteering+to+phone+bank+for+Brandon+West!+Here%27s+the+Zoom:+bit.ly/brandon-phonebank
    - as you can see, the start + end time are specified in ISO format(`dates=20210114T180000/20210114T200000`), the location, and body are filled out, and a timezone is also specified (`America/New_York`)

### Formula to format Date And Start Time to ISO

```
DATETIME_FORMAT({Date and Start Time}, 'YYYYMMDDT') 
& DATETIME_FORMAT(DATETIME_PARSE({Start Time}, "LT"),"HHmmss")
```

### Formula to format Start + End Time to ISO (`FormattedIsoTime` in above example formula)
```
DATETIME_FORMAT({Date and Start Time}, 'YYYYMMDDT') & DATETIME_FORMAT(DATETIME_PARSE({Start Time}, "LT"),"HHmmss") & "/" & DATETIME_FORMAT({Date and Start Time}, 'YYYYMMDDT') & DATETIME_FORMAT(DATETIME_PARSE({End Time}, "LT"),"HHmmss")
```


## Hours Till Event
- Useful for hour-based time triggers
- `DATETIME_DIFF({Date and Start Time}, NOW(), 'hours') + 4` // add 4 to offset EST from GMT


