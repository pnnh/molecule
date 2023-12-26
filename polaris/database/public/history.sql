create table history
(
    pk          varchar(96) not null
        constraint history_pk
            primary key,
    title       varchar(128),
    body        text,
    create_time timestamp with time zone default now(),
    update_time timestamp with time zone default now(),
    creator     varchar(96),
    source      varchar(96),
    previous    varchar(96),
    version     integer                  default 1,
    header      varchar(4096)
);

alter table history
    owner to postgres;

grant delete, insert, select, update on history to huable;

