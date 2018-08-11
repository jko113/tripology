CREATE TABLE users (
    user_id serial primary key,
    username varchar(30),
    password varchar(300)
);

CREATE TABLE trips (
    trip_id serial primary key,
    user_id integer REFERENCES users(user_id),
    title varchar(30),
    description varchar(100),
    start_date timestamp,
    end_date timestamp
);

CREATE TABLE categories (
    category_id serial primary key,
    title varchar(30)
);

CREATE TABLE contacts (
    contact_id serial primary key,
    name varchar(30),
    phone varchar(30),
    email varchar(50)
);

CREATE TABLE trip_activities (
    activity_id serial primary key,
    title varchar(30),
    description varchar(150),
    cost float,
    location varchar(50),
    trip_id integer REFERENCES trips(trip_id) ON DELETE CASCADE,
    start_date timestamp,
    end_date timestamp,
    contact_id integer REFERENCES contacts(contact_id),
    category_id integer REFERENCES categories(category_id)
);
