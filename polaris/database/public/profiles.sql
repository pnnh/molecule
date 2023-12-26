create table profiles
(
    pk          varchar(64) not null
        constraint profiles_pk
            primary key,
    create_time timestamp with time zone,
    update_time timestamp with time zone,
    nickname    varchar(96),
    username    varchar(96),
    owner       varchar(96)
);

alter table profiles
    owner to postgres;

create unique index profiles_username_uindex
    on profiles (username);

create unique index profiles_owner_username_uindex
    on profiles (owner, username);

grant delete, insert, select, update on profiles to huable;

