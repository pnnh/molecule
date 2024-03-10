create table comments
(
    pk          varchar(64)              not null
        constraint "PK_comments"
            primary key,
    title       varchar(128)             not null,
    content     text                     not null,
    create_time timestamp with time zone not null,
    update_time timestamp with time zone not null,
    creator     varchar(64)              not null,
    receiver    varchar(64)              not null
);

alter table comments
    owner to postgres;

grant delete, insert, select, update on comments to huable;

