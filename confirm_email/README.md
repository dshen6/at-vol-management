## Automatic Confirmation Emails on Event Signup

### Basic Usage
This automation sends an automatic confirmation email, anytime a volunteer signs up for an event. This can be setup without custom code, and this gets 90% of the value.
- We recommend using a `"When record matches Condition"` Trigger, to make sure there's a valid email address, and that they've actually signed up for an event first.
    - This also lets us add different versions of this automation, for different event types.
- Use the "Send Gmail" Action, and insert the event info. Remember to use Markdown formatting to make it look pretty, insert links inline, bold/italic etc.
### Advanced Usage
- The `confirm_email.ts` script just rolls up multiple sign ups, so that a volunteer signing up for 2 phonebanks at the same time, doesn't get 2 different emails. A nice to have, but not necessary.