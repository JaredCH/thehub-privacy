# TheHub privacy policy

**Effective 11 November 2026 · Last updated 11 November 2026**

TheHub is a private family app: a live location map, shared calendars, and a
28-hour weather strip. This page explains what it does with your information.

The hosted version of this page is the authoritative one. The same text is shown
inside the app at **Privacy**, and it is the text the Google Play and Amazon
Appstore listings point at.

## The short version

- You sign up with a username and a password. We never ask for an email address
  or a phone number.
- Your location is encrypted on your own device with a key your family holds. The
  server stores ciphertext it cannot read, and deletes it within four hours.
- No advertising, no analytics, no trackers, and nothing is ever sold.

## What we collect and why

### Your account

A username, the display name and colour you choose, a password hash (Argon2id —
we never store the password itself), and a random salt used by your browser to
wrap your family keys. This is what lets you sign in and be recognised by your
family.

### Location, only while you turn it on

When you tap **Share my location**, your device sends a point at most every
fifteen seconds while the app is open and visible. Each point is sealed with
AES-256-GCM using your family's key before it leaves the device. We store the
sealed payload plus the time, accuracy, battery percentage, and whether you were
moving. We cannot decrypt any of it; the map in someone else's browser can,
because they hold the same key.

Location points are deleted from our database within four hours of being
recorded. Turning sharing off stops new points immediately. Browser location
sharing stops when the tab is closed, and the Android app stops when it is not in
the foreground — the app does not track in the background and does not request
background location permission.

### Your family

Family name, timezone, who is a member, their role, and the invite codes that
were used. Invite codes are stored only as a one-way hash plus the family key
sealed with the invite secret.

### Calendars

If you add a calendar feed, we store the URL encrypted and fetch it on your
behalf. If you connect Google Calendar, Google gives us a read-only refresh
token, which we store encrypted with a server key, and we copy event titles,
times, and locations into our cache so the calendar opens quickly. Calendar
content is not end-to-end encrypted: the server can read it in order to merge
feeds. You can disconnect at any time, which revokes the token with Google.

### Weather and maps

The weather strip asks Open-Meteo for a forecast using your position rounded to
about 11 km; we store nothing from that request. Map tiles come from
OpenStreetMap directly from your browser, so their servers see your IP address
and the area you are looking at, as they would on any map website.

### Security logs

Sessions record a hashed IP address, a browser user agent, and timestamps, and our
server keeps ordinary request logs. We use these to keep accounts safe and to
debug failures, not to profile anyone.

## What we do not collect

No email address, no phone number, no contacts, no photos, no advertising
identifier, no cross-site tracking, no analytics SDK, and no third-party
advertising. There is no data broker on the other end of this service.

## Who else touches your data

- **Railway** hosts the application and its PostgreSQL database. Their privacy
  policy: <https://railway.com/legal/privacy>.
- **Google** — only if you connect Google Calendar. Their privacy policy:
  <https://policies.google.com/privacy>. We request the `calendar.readonly` scope
  and nothing else.
- **Open-Meteo** — the weather forecast. Their privacy policy:
  <https://open-meteo.com/en/terms>.
- **OpenStreetMap** tile servers — the map imagery. Their privacy policy:
  <https://osmfoundation.org/wiki/Privacy_Policy>.

We do not sell data, share it with advertisers, or use it to train anything.

## Legal bases

Where the GDPR applies: we process account and family data because it is
necessary to provide the service you asked for; security logs because we have a
legitimate interest in keeping accounts safe; and location sharing and Google
Calendar connections only with your consent, which you can withdraw at any time by
turning the feature off.

## How long we keep it

- Location points: four hours.
- Calendar cache: until you remove the feed or the family.
- Account and family data: until you delete your account or leave the family.
- Server logs: about thirty days.
- Deleting your account removes your login, key backups, and location data
  immediately.

## Security

Traffic is encrypted in transit. Location and calendar credentials are encrypted
at rest with AES-256-GCM; family keys are derived with HKDF-SHA256 and never sent
to the server; passwords are hashed with Argon2id; sessions are opaque random
tokens, stored only as hashes. No system is perfect, but a database dump of TheHub
does not contain anyone's location.

## Your choices

- Change your display name or colour at any time.
- Pause sharing, or leave a family, from the family page.
- Disconnect Google Calendar from the calendar panel.
- Delete your account in the app (Your families → Delete account) or request it
  at the [delete page](delete-account.html). Families you were the only member of
  are deleted; in a family with other members, ownership passes to the
  longest-standing member.
- Ask us for a copy of what we hold about you, or ask us to correct it, by
  writing to <Hicksjaredc@gmail.com>.

## Children

TheHub is made for families, but an account holder must be at least 13 years old.
We do not knowingly collect data from children under 13. If you believe a child
under 13 has an account, write to us and we will remove it.

## Changes

If this policy changes in a way that matters, we will show a notice in the app
before the change takes effect. The date at the top always reflects the current
version, and the new version is published at this same URL.

## Contact

Questions, requests, or complaints: <Hicksjaredc@gmail.com>.
