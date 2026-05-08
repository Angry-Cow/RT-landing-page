# DATAIMPORTSCRIPT.md

> ⚠️ FOR REFERENCE ONLY — DO NOT EXECUTE AUTOMATICALLY

```sql
BEGIN;
-- =========================================================
-- 1) TABLES
-- =========================================================
CREATE TABLE IF NOT EXISTS course (
  id VARCHAR(36) PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  price TEXT NOT NULL,
  price_note TEXT,
  duration TEXT NOT NULL,
  description TEXT NOT NULL,
  features TEXT NOT NULL,
  button_text TEXT NOT NULL,
  is_active BOOLEAN,
  "switch" INTEGER,
  "order" INTEGER,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  created_by_user_id TEXT
);
CREATE TABLE IF NOT EXISTS service (
  id VARCHAR(36) PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_src TEXT NOT NULL,
  card_image_src TEXT NOT NULL,
  card_image_alt TEXT NOT NULL,
  list_items TEXT NOT NULL,
  "switch" INTEGER,
  "order" INTEGER,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  created_by_user_id TEXT
);
CREATE TABLE IF NOT EXISTS offering (
  id VARCHAR(36) PRIMARY KEY,
  title TEXT NOT NULL,
  price TEXT NOT NULL,
  price_note TEXT,
  duration TEXT NOT NULL,
  button1_text TEXT NOT NULL,
  button2_text TEXT NOT NULL,
  "switch" INTEGER,
  "order" INTEGER,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  created_by_user_id TEXT
);
CREATE TABLE IF NOT EXISTS faq (
  id VARCHAR(36) PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  link TEXT,
  link_text TEXT,
  "switch" INTEGER,
  "order" INTEGER,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  created_by_user_id TEXT
);
CREATE TABLE IF NOT EXISTS booking (
  id VARCHAR(36) PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  course TEXT NOT NULL,
  preferred_date TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  number_of_attendees TEXT,
  training_location TEXT,
  request_type TEXT,
  "switch" INTEGER,
  "order" INTEGER,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  created_by_user_id TEXT
);

-- =========================================================
-- 2) CLEAN TARGET TABLES
-- =========================================================
DELETE FROM booking;
DELETE FROM faq;
DELETE FROM offering;
DELETE FROM service;
DELETE FROM course;

-- =========================================================
-- 3) DATA: COURSE
-- =========================================================
INSERT INTO course (
  id, title, category, price, price_note, duration, description, features, button_text,
  is_active, "switch", "order", created_at, updated_at, created_by_user_id
) VALUES
('2c3a12be-7fc2-4fea-bfb6-683031779de9','Refuse To Be A Victim','Personal Awareness','$49','per person - 4 person minimum','4 Hours • Next: Contact Us','A comprehensive seminar focused on situational awareness and personal safety strategies.','"Basic Safety Fundamentals",
"At Home, Work and Away",
"Classroom Instruction",
"Training Materials",
"Certificate of Completion"','Contact Us Now To Schedule',TRUE,1,1,'2026-03-24T22:34:40.000Z','2026-04-02T15:28:51.000Z','69c2f5958256d2186c632dec'),
('5285d4f6-8ea2-4eac-9c47-07d0ff1f49ec','Situational Awareness Level 1','Personal Awareness','$95','per person','2 Hours • Next: Contact Us','Master the art of identifying threats before they escalate with our Level 1 certification.','"Realistic Scenarios",
"Practical Application",
"Reference Materials",
"Certificate of Completion"','Contact Us Now To Schedule',TRUE,1,2,'2026-03-24T22:34:40.000Z','2026-04-02T15:28:51.000Z','69c2f5958256d2186c632dec'),
('707abd3e-c396-4e13-9a5f-43b6de33e432','De-escalation That Works','Personal Awareness','$95','per person','2 Hours • Next: Contact Us','Learn proven verbal and non-verbal techniques to diffuse high-tension situations safely.','"How To Go From Bad To Better",
"Reduce The Chance Of Violence",
"Practical Training",
"Training Materials",
"Certificate of Completion"','Contact Us Now To Schedule',TRUE,1,3,'2026-03-24T22:34:40.000Z','2026-04-02T15:28:52.000Z','69c2f5958256d2186c632dec'),
('838072cd-f86e-4b1e-8ee6-f51ef021a1dd','First Aid CPR AED','First Aid','$125','per person - 4 person minimum','4 Hours • Next: Contact Us','Comprehensive first aid, CPR, and AED training. Gain certification-ready skills for responding to medical emergencies.','"HSI or AHA Certification Course",
"Hands-on Practical Exam",
"2025 Standards Compliant",
"Student E-Workbook Provided",
"Certificate and Card Provided"','Contact Us Now To Schedule',TRUE,1,4,'2026-03-24T22:34:40.000Z','2026-04-02T15:28:52.000Z','69c2f5958256d2186c632dec'),
('417ed123-5374-4d09-8825-fa876ea13b39','BLS – Basic Life Saving for Rescuers','First Aid','$125','per person','4 Hours • Next: Contact Us','Comprehensive CPR and AED training for professional rescuers, EMTs, Nurses, other healthcare providers and lifeguards.','"HSI or AHA Certification Course",
"Written and Hands-on Exam",
"Meets NJ State Compliance",
"Priority Scheduling for professionals"','Contact Us Now To Schedule',TRUE,1,5,'2026-03-25T19:08:03.000Z','2026-04-02T15:28:53.000Z','69c2f5958256d2186c632dec'),
('1641d5cb-2ce5-41c4-b276-2af1a617ddf3','MACE Personal Defense Spray','Personal Defense','$125','per person','3 Hours • Next: Contact Us','Learn the safe and effective use of MACE personal defense spray for civilians in NJ, including proper deployment, legal considerations, and scenario practice.','"Basic Safety Fundamentals",
"Classroom Instruction",
"Inert Agent Practice",
"Training Materials",
"NJ Compliant OC Spray Provided",
"Certificate of Completion"','Contact Us Now To Schedule',TRUE,1,6,'2026-03-25T19:08:03.000Z','2026-04-02T15:28:53.000Z','69c2f5958256d2186c632dec'),
('1421e80c-6702-4380-9485-6d9800c2e76f','Conducted Energy Devices','Personal Defense','$125','per person','3 Hours • Next: Contact Us','Introduction to conducted energy devices for civilians. Learn safety protocols, legal use, and practical application in self-defense situations.','"Basic Safety Fundamentals",
"Classroom Instruction",
"Practice on Training Targets",
" Personal Contact CED Included",
"Training Materials Provided",
"Certificate of Completion"','Contact Us Now To Schedule',TRUE,1,7,'2026-03-25T19:08:04.000Z','2026-04-02T15:28:54.000Z','69c2f5958256d2186c632dec'),
('969218d2-2e6f-4567-a938-9c6322fdfae0','Stop The Bleed','First Aid','$49','per person','2 Hours • Next: Contact Us','Life-saving training focused on rapid bleeding control and tourniquet application. Essential skills for emergency response.','"Traumatic Bleeding First Aid",
"Hands On Training",
"Wound Packing",
"Tourniquet Use",
"Certificate of Completion"','Contact Us Now To Schedule',TRUE,1,8,'2026-03-25T19:08:04.000Z','2026-04-02T15:28:54.000Z','69c2f5958256d2186c632dec'),
('938feb6e-2136-4847-8691-6c0c870310f4','ETCC Emergency Tactical Casualty Control','First Aid','$125','per person','4 Hours • Next: Contact Us','Traumatic Bleeding Skills for Emergency Responders, Law Enforcement, Security, beyond Stop The Bleed with significant hands on practice on simulated bleeding wounds. Chest seal application and review of IFAK contents and requirements.','"Traumatic bleeding intervention",
"For tactical or high risk situations", "Beyond Stop The Bleed",
"Tactical or under threat considerations"','Contact Us Now To Schedule',TRUE,1,9,'2026-03-26T01:53:23.000Z','2026-04-02T15:28:54.000Z','69c2f5958256d2186c632dec');

-- =========================================================
-- 4) DATA: SERVICE
-- =========================================================
INSERT INTO service (
  id, title, description, icon_src, card_image_src, card_image_alt, list_items,
  "switch", "order", created_at, updated_at, created_by_user_id
) VALUES
('b87b9a61-1611-4dbb-a387-243a07901ab4','First Aid, CPR & Bleeding Control','Hands-on training for life-saving emergencies. Learn by doing. You will be ready to act quickly when every second counts.','ICON_6','SERVICE_IMG_FIRST_AID','CPR Training','["1st Aid and CPR","Tourniquet Use","Bleeding Control","BLS Certification"]',1,1,'2026-03-25T19:08:04.000Z','2026-04-02T15:28:55.000Z','69c2f5958256d2186c632dec'),
('31809539-4b41-471e-a93b-5f725bdb0b82','Situational Awareness and Deescalation','Personal defense using escape and evasion and/or less lethal options. We have all heard Run, Hide, Fight. We must also understand the Flight, Fight, Freeze','ICON_8','SERVICE_IMG_AWARENESS','Safe and Secure Facility','["Refuse to be a Victim","Situational Awareness","Realistic Deescalation","For Civilians and L.E.O."]',1,2,'2026-03-25T19:08:04.000Z','2026-04-02T15:28:55.000Z','69c2f5958256d2186c632dec'),
('bfbeb68e-b471-4ff0-92e8-ecdf98cedfdc','Personal Protection','Personal defense using escape and evasion and/or less lethal options. We must understand our body''s "Flight, Fight, Freeze" response and learn to manage it.','ICON_9','SERVICE_IMG_PROTECTION','Less-Lethal Personal Defense','["Active Shooter Response","Basic Defense and Escape","O.C., Sprays for Civilians","Conducted Energy Devices (stun guns) for Civilians"]',1,3,'2026-03-25T19:08:04.000Z','2026-04-02T15:28:55.000Z','69c2f5958256d2186c632dec'),
('48ba1fd4-ec38-4650-a06f-78ec400534e1','T.O.L.R. - Tools of Last Resort','T.O.L.R. = Tools of Last Resort.   What are the T.O.L.R.?  Firearms.   Handguns for self defense and protection of others','ICON_10','SERVICE_IMG_TOLR','T.O.L.R - Tools of Last Resort','["Entry Level Pistol","NRA Basic Pistol","Defensive Pistol","NJ State Permit to Carry"]',1,4,'2026-03-25T19:08:04.000Z','2026-04-02T15:28:56.000Z','69c2f5958256d2186c632dec');

-- =========================================================
-- 5) DATA: OFFERING
-- =========================================================
INSERT INTO offering (
  id, title, price, price_note, duration, button1_text, button2_text,
  "switch", "order", created_at, updated_at, created_by_user_id
) VALUES
('9ebbf5af-dbf5-431e-a911-d0d912415573','Stop The Bleed','$49','per person','2 Hours • Contact us to arrange a class (Minimum 4 Attendees)','Contact Now','Group Rate',1,1,'2026-04-02T01:15:25.000Z','2026-04-02T15:45:28.000Z','69c2f5958256d2186c632dec'),
('d5f0f81d-eea1-4d3d-8e57-0b57869c7e63','First Aid CPR AED','$125','per person','4 Hours • Contact us to arrange a class','Contact Now','Group Rate',1,2,'2026-04-02T01:15:25.000Z','2026-04-02T15:28:56.000Z','69c2f5958256d2186c632dec'),
('0da9d378-de00-48dc-af72-c89cce4d9be7','ETCC Emergency Tactical Casualty Control','$125','per person','4 Hours • Contact us to arrange a class','Contact Now','Group Rate',1,3,'2026-04-02T01:15:25.000Z','2026-04-02T15:28:56.000Z','69c2f5958256d2186c632dec'),
('e1168af8-dc25-46c3-b935-580dde4c6e0c','BLS – Basic Life Saving for Rescuers','$125','per person','4 Hours • Contact us to arrange a class','Contact Now','Group Rate',1,4,'2026-04-02T01:15:25.000Z','2026-04-02T15:28:57.000Z','69c2f5958256d2186c632dec'),
('1a020194-751a-417f-973f-b5bdfcd563f8','Refuse To Be A Victim','$49','per person','4 Hours • Contact us to arrange a class (Minimum 4 Attendees)','Contact Now','Group Rate',1,5,'2026-04-02T01:15:25.000Z','2026-04-02T15:28:57.000Z','69c2f5958256d2186c632dec'),
('295d09a7-5f13-4afb-90e0-4e3a76860be8','Situational Awareness Lvl 1','$95','per person','2 Hours • Contact us to arrange a class','Contact Now','Group Rate',1,6,'2026-04-02T01:15:26.000Z','2026-04-02T15:28:57.000Z','69c2f5958256d2186c632dec'),
('8cd6c836-dd46-4f41-81b8-3ae3c6876fd9','De-escalation That Works','$95','per person','2 Hours • Contact us to arrange a class','Contact Now','Group Rate',1,7,'2026-04-02T01:15:26.000Z','2026-04-02T15:28:57.000Z','69c2f5958256d2186c632dec'),
('b4dabb77-d5ff-4c24-ad01-3d11c7976e4e','MACE Personal Defense Spray','$125','per person','3 Hours • Contact us to arrange a class','Contact Now','Group Rate',1,8,'2026-04-02T01:15:26.000Z','2026-04-02T15:28:58.000Z','69c2f5958256d2186c632dec'),
('3e009860-92c3-4843-98b0-82df0db99ef1','Conducted Energy Devices Level 1','$125','per person','3 Hours • Contact us to arrange a class','Contact Now','Group Rate',1,9,'2026-04-02T01:15:26.000Z','2026-04-02T15:28:58.000Z','69c2f5958256d2186c632dec');

-- =========================================================
-- 6) DATA: FAQ
-- =========================================================
INSERT INTO faq (
  id, question, answer, link, link_text, "switch", "order", created_at, updated_at, created_by_user_id
) VALUES
('6139b2ff-a10c-4825-b10e-bd87995d5739','Do I need a permit or ID to take a firearms safety course?','No permit is required to enroll in our NJ Firearms Safety courses. However, per New Jersey law, a valid government-issued photo ID is required on the day of class. If you plan to apply for a Firearms Purchaser ID Card or a Permit to Purchase a Handgun after completing the course, we can walk you through exactly what documentation the NJ State Police require — just ask at check-in.','',NULL,1,1,'2026-04-02T16:27:51.000Z','2026-04-02T16:46:03.000Z','69c2f5958256d2186c632dec'),
('db42bd4f-f973-4a11-bca9-a529b90756b7','How large are your classes?','We keep class sizes intentionally small — typically 6 to 12 participants — so every student gets hands-on attention from the instructor. Larger groups can be accommodated for corporate or group bookings; contact us to discuss a private session.','',NULL,1,2,'2026-04-02T16:27:51.000Z','2026-04-02T16:27:51.000Z','69c2f5958256d2186c632dec'),
('4350ff14-036d-4f6a-93d9-fda1a6725dee','How long is my certification valid?','CPR/AED and First Aid certifications issued through our courses are valid for 2 years from the date of completion, in line with American Heart Association and Red Cross guidelines. Firearms safety certificates do not expire under NJ law, though we recommend periodic refresher training. We''ll remind you when your renewal is coming up if you provide an email at booking.','',NULL,1,3,'2026-04-02T16:27:51.000Z','2026-04-02T16:27:51.000Z','69c2f5958256d2186c632dec'),
('224a8237-b9d3-45d8-85fc-ce9419984be3','Are your courses accepted by the NJ State Police?','Yes. Our NJ Firearms Safety course satisfies the safety-training requirement for the NJ Firearms Purchaser Identification Card and Permit to Purchase a Handgun applications. Completion certificates are issued immediately after class.','',NULL,1,4,'2026-04-02T16:27:52.000Z','2026-04-02T16:27:52.000Z','69c2f5958256d2186c632dec'),
('7cb4cdbb-5b36-41ea-80de-6808ba6361d9','What should I bring to class?','Bring a valid photo ID, comfortable clothing you can move in, and a notepad if you like to take notes. All training materials, mannequins (for CPR), and equipment are provided. For firearms courses, ammunition and range equipment are included — you do not need to bring your own firearm unless specifically noted in your course description.','',NULL,1,5,'2026-04-02T16:27:52.000Z','2026-04-02T16:27:52.000Z','69c2f5958256d2186c632dec'),
('171d9606-e0e4-42a5-aabf-316e460b6f94','Do you offer private or corporate group training?','Absolutely. We offer on-site and facility-based private sessions for businesses, security teams, schools, and community organizations throughout New Jersey. Group rates are available. Use the booking form above or call us directly to discuss scheduling and pricing for your team.','',NULL,1,6,'2026-04-02T16:27:52.000Z','2026-04-02T16:27:52.000Z','69c2f5958256d2186c632dec'),
('9b841d3f-3f60-43fe-a212-fd47cbc61f9e','What is your cancellation and refund policy?','Cancellations made at least 48 hours before your scheduled class receive a full refund or free reschedule. Cancellations within 48 hours may be rescheduled once at no charge. No-shows forfeit their seat. If we ever need to cancel a class due to low enrollment or circumstances beyond our control, you''ll receive a full refund and priority re-enrollment.','',NULL,1,7,'2026-04-02T16:27:52.000Z','2026-04-02T16:27:52.000Z','69c2f5958256d2186c632dec');

-- =========================================================
-- 7) DATA: BOOKING
-- =========================================================
INSERT INTO booking (
  id, full_name, email, phone, course, preferred_date, notes, number_of_attendees,
  training_location, request_type, "switch", "order", created_at, updated_at, created_by_user_id
) VALUES
('3b7890b2-9945-44b5-8e8c-d3fe12d1ffc5','Bill Bailey','lawrenceschlack@gmail.com','555-555-4455','BLS – Basic Life Saving for Rescuers','2026-04-03T00:00:00.000Z','we have display devices','5-12','Client Location','group',1,1,'2026-04-01T15:44:25.000Z','2026-04-02T15:28:58.000Z','69c2f5958256d2186c632dec');

COMMIT;
```
