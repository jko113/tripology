INSERT INTO users (username, password) VALUES
('ca', 'f33fb7ef702048a90d6df1a0ab4852aa');

INSERT INTO trips (title, user_id, description, start_date, end_date) VALUES
('Cambodia', 1, 'There''s lots of pretty things to see in Cambodia!', '2017-11-04', '2020-11-11');

INSERT INTO categories (title) VALUES
('Breakfast'),
('Morning'),
('Lunch'),
('Afternoon'),
('Dinner'),
('Evening'),
('Transportation'),
('Lodging');

INSERT INTO contacts (name, phone, email) VALUES
('Timmy Torgugas', '283-383-9954', 'timmy@robinson.com'),
('Bobby Maxwell', '800-555-3293', 'bobby@maximus.com'),
('Leslie Thompson', '753-122-7401', 'lesliet@funtrips.com');

INSERT INTO trip_activities (title, description, cost, location, trip_id, start_date, end_date, contact_id, category_id) VALUES
('Angkor Wat', 'Departure is 5 am sharp from the hotel lobby. We''ll need to carry lunch with us.', 120, 'Siem Reap', 1, '2018-11-06', '2018-11-06', 3, 1),
('Beach Day', 'Don''t forget the sunscreen or umbrella. The taxi reservation number is B43296.', 30, 'Battambang', 1, '2018-11-05', '2018-11-05', 3, 1),
('Tunnel Exploration', 'Tim Johnson agreed to be our guide -- he takes traveler''s checks.', 75, 'Ho Chi Minh City', 1, '2018-11-08', '2018-11-08', 3, 2),
('Stargazing', 'I read there''s supposed to be a meteor shower that night, and there''s no place to view it like the Cambodian countryside.', 15, 'Chi-phat', 1, '2018-11-09', '2018-11-09', 3, 3),
('Food tour', 'Booked tickets with Capital Foodies; they requested a confirmation call the morning of.', 35.50, 'Phnom Penh', 1, '2018-11-10', '2018-11-10', 3, 5),
('Hotel Lugubrious', 'They say, contrary to the name, that it''s a fantastic place to stay. Maybe they actually meant to say ''luxurious''?', 500, 'Phnom Penh', 1, '2018-11-04', '2018-11-11', 3, 7),
('Dinner with Shane', 'Shane said on our last night he plans to take us to that Michelin restaurant he''s always raving about -- Malis I think?', 200, 'Phnom Penh', 1, '2018-11-10', '2018-11-10', 3, 6),
('Breakfast with Benny', 'Benny will pick us up from the hotel around 9; it''s a surprise where we''re going..', 80, 'Phnom Penh', 1, '2018-11-07', '2018-11-07', 3, 4);