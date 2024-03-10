create table viewers
(
    pk          varchar(64)              not null
        constraint "PK_article_viewers"
            primary key,
    source      varchar(64)              not null,
    create_time timestamp with time zone not null,
    update_time timestamp with time zone not null,
    creator     varchar(64),
    target      varchar(64),
    direction   varchar(16),
    channel     varchar(64)
);

alter table viewers
    owner to postgres;

grant delete, insert, select, update on viewers to huable;

