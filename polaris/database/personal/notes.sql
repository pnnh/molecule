create table personal.notes
(
    pk          varchar(64)                   not null
        constraint "PK_articles"
            primary key,
    title       varchar(128)                  not null,
    header      varchar(64)                   not null,
    body        text                          not null,
    create_time timestamp with time zone      not null,
    update_time timestamp with time zone      not null,
    keywords    varchar(128) default ''::text not null,
    description varchar(512) default ''::text not null,
    status      integer                       not null,
    cover       varchar(256) default ''::text not null,
    owner       varchar(96),
    name        varchar(96),
    notebook    varchar(96),
    discover    integer,
    profile     varchar(96),
    directory   varchar(96)
);

alter table personal.notes
    owner to huable;

