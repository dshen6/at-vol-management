## Volunteer Re-engagement
This is a series of AT flows that make it easier to contact Volunteers thru call/text. 

## Easier Texting thru AT formulas

This is an example formula to generate a text script:
```
CONCATENATE("Hey ",LEFT({Full Name},SEARCH(" ",{Full Name})-1),"! This is ", {Re-Engager}," from team Brandon West. I wanted to reach out and thank you for all of your help. The next step for our campaign is to witness the absentee and affidavit ballot count this week. If you have any availability please fill out the form below and I'll be in touch with more details. Note: The BOE will only give us ~24 hours notice for when our count will start, so please fill out any times that you're available, but don't expect that we would need you for each time slot. THANK YOU! bit.ly/absentee-witness")
```

This formula is the time-saver. Clicking this on iPhone AT mobile app opens up the text app with the pre-populated phonenumber and message.
```
"sms:" & VALUE({Phone Number}) & "?body=" & ENCODE_URL_COMPONENT({Text After VM})
```

- For texting from Android, the value from the formula above needs to be copied into a cell of type "URL". Then it can be clicked from AT mobile app