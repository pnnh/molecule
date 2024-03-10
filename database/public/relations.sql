create table relations
(
    pk          varchar(64)                  not null
        constraint "PK_relations"
            primary key,
    source      varchar(64)                  not null,
    create_time timestamp with time zone     not null,
    update_time timestamp with time zone     not null,
    creator     varchar(64)                  not null,
    target      varchar(64)                  not null,
    direction   varchar(16) default ''::text not null,
    discover    bigint      default 0        not null,
    status      integer     default 0,
    owner       varchar(96),
    profile     varchar(96)
);

comment on column relations.discover is '发现次数、阅读次数';

alter table relations
    owner to postgres;

grant delete, insert, select, update on relations to huable;

