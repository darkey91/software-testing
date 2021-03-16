create table if not exists task.user
(
    id    integer      not null primary key auto_increment,
    login varchar(64) not null
);

create table if not exists task.task
(
    id        integer       not null
            primary key auto_increment,
    name      varchar(4000) not null,
    completed boolean default false not null,
    login     varchar(64)  not null
        references user (login)
);
