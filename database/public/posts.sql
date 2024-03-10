create table posts
(
    pk          varchar(64)                   not null
        constraint "PK_articles"
            primary key,
    title       varchar(128)                  not null,
    header      varchar(64)                   not null,
    body        text                          not null,
    create_time timestamp with time zone      not null,
    update_time timestamp with time zone      not null,
    creator     varchar(64)                   not null,
    keywords    varchar(128) default ''::text not null,
    description varchar(512) default ''::text not null,
    status      integer                       not null,
    cover       varchar(256) default ''::text not null,
    owner       varchar(96),
    name        varchar(96),
    channel     varchar(96),
    discover    integer      default 0,
    profile     varchar(96),
    partition   varchar(96)
);

alter table posts
    owner to postgres;

create unique index articles_channel_name_uindex
    on posts (channel, name);

grant delete, insert, select, update on posts to huable;

