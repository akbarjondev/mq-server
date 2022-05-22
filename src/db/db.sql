create table categories(
	category_id serial primary key,
	category_name varchar(60)
);

create table callbacks(
	callback_id serial primary key,
	callback_title varchar(150),
	callback_url varchar(150),
	callback_type varchar(10),
	callback_active boolean,
	callback_function1 text,
	callback_function2 text,
	category_id int
);

----MOCK
insert into categories(category_name) 
	values('income');


insert into callbacks(
	callback_title,
	callback_url,
	callback_type,
	callback_active,
	callback_function1,
	callback_function2,
	category_id
) 
	values(
		'outgo callbacks',
		'https://api.test.com/sjkcn',
		'post',
		true,
		'const pool = new Pool({
			user: process.env.USER_DATABASE,
			password: process.env.PASSWORD,
			database: process.env.USER_DATABASE,
			host: process.env.HOST,
		});',
		'const pool = new Pool({
			user: process.env.USER_DATABASE,
			password: process.env.PASSWORD,
			database: process.env.USER_DATABASE,
			host: process.env.HOST,
		});',
		2
	);