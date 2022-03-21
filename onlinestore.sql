create database onlineStore;
use onlineStore;

create table users(
id int auto_increment,
firstName varchar(255),
lastName varchar(255),
email varchar(255),
identification varchar(9),
password varchar(255),
city varchar(255),
street varchar(255),
role varchar(255) default "user",
primary key (id)
);

create table category(
id int auto_increment,
name varchar(255),
primary key (id)
);

create table product(
id int auto_increment,
name varchar(255),
categoryId int,
price int,
imgUrl text,
primary key (id),
foreign key(categoryId) references category(id)
);

create table cart(
id int auto_increment,
userId int,
creationDate DATE NOT NULL,
isActive boolean,
primary key (id),
foreign key(userId) references users(id)
);

create table cartItem(
id int auto_increment,
productId int,
quantity int,
totalPrice int,
cartId int,
primary key (id),
foreign key(productId) references product(id),
foreign key(cartId) references cart(id)
);

create table orders(
id int auto_increment,
userId int,
cartId int,
totalPrice int,
city varchar(255),
street varchar(255),
deliveryDate DATE NOT NULL,
orderDate DATE NOT NULL,
creditCard varchar(255),
primary key (id),
foreign key(userId) references users(id),
foreign key(cartId) references cart(id)
);

insert into category(name)
values('Vodka'),('Whiskey'),('Gin'),('Beer');

insert into cart(userId,creationDate,isActive)
values(1,"2020-01-01'",true);

insert into orders(userId,cartId,isActive)
values(1,"2020-01-01'",true);

insert into users(firstName,lastName,email,identification,password,city,street,role)
values("yossi","cohen'","yossi@gmail.com",123456789,12345,"dizingoff","admin");


