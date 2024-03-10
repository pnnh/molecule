create table channels
(
    pk          varchar(64)                               not null
        constraint "PK_channels"
            primary key,
    title       varchar(128)                              not null,
    create_time timestamp with time zone                  not null,
    update_time timestamp with time zone                  not null,
    creator     varchar(64)                               not null,
    description varchar(256)                              not null,
    name        varchar(96) default ''::character varying not null,
    image       varchar(2048),
    owner       varchar(96),
    profile     varchar(96)
);

alter table channels
    owner to postgres;

create unique index "IX_channels_name"
    on channels (name);

create unique index channels_profile_name_uindex
    on channels (profile, name);

grant delete, insert, select, update on channels to huable;

