# What is this Project, and why you should read this
This documents common Airtable workflows used in recruiting and managing volunteers. AirTable (AT) automations require a Pro (paid) account.

AT is extremely powerful, and can save you lots of time and money. Over the course of one campaign, we used AT to:
-  Auto-send 3000+ sign-up confirmation emails for 300+ different events. These emails automatically pull in details like Start Time/Meeting Site, and event-specific info like "here's the talking script we'll be using for this event."
- Help track our volunteer "re-engagement interactions". This means calling and texting volunteers to sign up for a shift.
    - AT helps track attendance, so we don't bother regular volunteers. We also tracked how many times a volunteer had been re-engaged, so as not to spam them.
    - Our team of re-engagers also sent 3000+ texts. AT formulas speed this up to a couple clicks per text - so that 100 texts take 15 min.
- Automate countless "glue" tasks - attaching Volunteers to Events, emailing field leads the contact info of the volunteers that will be attending their event.

- Multiple City Council campaigns were run entirely on AT - without using ActionNetwork.


## Intended Audience
Beyond the code, a lot of the value in these docs are in the AT schemas themselves. *Organizers who can navigate databases, but aren't themselves coders, should be able to read this.*

- We assume basic familiarity with Airtable automations - the concept of a Triggers/Actions, Script Input/Output. See [Airtable docs.](https://support.airtable.com/hc/en-us/articles/360050974153-Automations-overview)

- We also assume the Event/Volunteer/Sign-up Airtable bases described in [Volunteer Management Template](https://airtable.com/tblclabldKtNzF86I/viwcWd0SuT7LDZtD5?blocks=hide).
- Some of the flows below depend on custom scripts written in Typescript. The code is simple, as the Airtable APIs do the heavy lifting.

## How to navigate this project
Each workflow lives in it's own folder. Read the README for each one first, and then refer to attached images/scripts as needed.