create table accounts
(
    pk           varchar(64)                                                            not null
        primary key,
    create_time  timestamp with time zone                                               not null,
    update_time  timestamp with time zone                                               not null,
    account      varchar(96)                                                            not null,
    password     varchar(96)              default ''::text                              not null,
    image        varchar(256)             default ''::text                              not null,
    description  varchar(256)             default ''::text                              not null,
    mail         varchar(128)             default ''::text                              not null,
    status       integer                                                                not null,
    nickname     varchar(64)              default ''::text                              not null,
    counter      integer                  default 0                                     not null,
    access_token varchar(256)             default ''::text                              not null,
    token_expire timestamp with time zone default '-infinity'::timestamp with time zone not null,
    token_issuer varchar(128)             default ''::character varying                 not null,
    sync_time    timestamp with time zone default now()
);

alter table accounts
    owner to postgres;

grant delete, insert, select, update on accounts to huable;

