This is super simple - just an automatic email, whenever you get a new volunteer.
- This consists of a trigger (see `trigger`), and `email_action`, and an `update_record_ action`.
-  The tiny insight that makes this work, is just a `"HasSentWelcomeEmail"` checkbox field on Volunteer, that gets checked once the email has been sent. See `action_update_record` for the action that checks this field.