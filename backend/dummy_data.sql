INSERT INTO users (username, password) VALUES
('sp', 'sp'),
('ir', 'ir'),
('ca', 'ca');

INSERT INTO trips (title, user_id, description, start_date, end_date) VALUES
('Spain', 1, 'A romantic second honeymoon in the great Spanish nation!', '2018-06-15', '2018-06-25'),
('Ireland', 2, 'Practicing English -- European style! Then, on to see Westlife!!!!! **** !!!', '2018-09-13', '2018-10-01'),
('Cambodia', 3, 'There''s lots of pretty things to see in Cambodia!', '2017-11-04', '2020-11-11');

INSERT INTO categories (title) VALUES
('morning'),
('afternoon'),
('evening');

INSERT INTO contacts (name, phone, email) VALUES
('Timmy Torgugas', '283-383-9954', 'timmy@robinson.com'),
('Bobby Maxwell', '800-555-3293', 'bobby@maximus.com'),
('Leslie Thompson', '753-122-7401', 'lesliet@funtrips.com');

INSERT INTO trip_activities (title, description, cost, location, trip_id, start_date, end_date, contact_id, category_id) VALUES
('kayaking', 'We''ll be kayaking on the Flint River', 50.50, 'Flint River, Spain', 1, '2018-06-16 08:30:00', '2018-06-16 08:30:00', 1, 1),
('nice dinner', 'We''ll have a nice dinner after kayaking all day', 50.75, 'Flint River, Spain', 1, '2018-06-16 18:30:00', '2018-06-16 18:30:00', 1, 3),
('practicing Irish', 'An Irish-talking fun fest for people who don''t speak Irish', 50, 'Dublin', 2, '2018-09-14 12:30:00', '2018-09-14 12:30:00', 2, 2),
('going pubbing', 'Hitting up the pubs is the best thing to do in Ireland', 50, 'Dublin', 2, '2018-09-14 20:30:00', '2018-09-14 20:30:00', 2, 3),
('Taj Mahal', 'Going to the Cambodian version of the Taj Mahal will be memorable indeed', 50.12, 'Capital City', 3, '2018-11-06 07:30:00', '2018-11-06 07:30:00', 3, 1),
('Temple Exploration', 'Temples in Cambodia are very well known, especially if they''re still intact', 50, 'Rural Town', 3, '2018-11-08 11:30:00', '2018-11-08 11:30:00', 3, 2),
('Eating Delicacies', 'Never before have you eaten delicacies as delicate as these.', 50, 'Capital City', 3, '2018-11-10 20:30:00', '2018-11-10 20:30:00', 3, 3);