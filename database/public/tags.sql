create table tags
(
    title       varchar(128)             not null,
    create_time timestamp with time zone not null,
    update_time timestamp with time zone not null,
    creator     varchar(64)              not null,
    description varchar(256)             not null,
    pk          varchar                  not null
        constraint tags_pk
            primary key
);

alter table tags
    owner to postgres;

grant delete, insert, select, update on tags to huable;

