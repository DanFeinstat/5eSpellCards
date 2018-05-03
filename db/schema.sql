create database spell_cards_5e;

use spell_cards_5e;

create table users(
    id int auto_increment not null,
    primary key (id),
    user_name varchar(30),
    user_password varchar(30)
);