create table personal.notebooks
(
    pk          varchar(64)                               not null
        constraint "PK_channels"
            primary key,
    title       varchar(128)                              not null,
    create_time timestamp with time zone                  not null,
    update_time timestamp with time zone                  not null,
    description varchar(256)                              not null,
    name        varchar(96) default ''::character varying not null,
    image       varchar(2048),
    owner       varchar(96),
    profile     varchar(96)
);

alter table personal.notebooks
    owner to postgres;

create unique index "IX_channels_name"
    on personal.notebooks (name);

create unique index channels_profile_name_uindex
    on personal.notebooks (profile, name);

grant delete, insert, select, update on personal.notebooks to huable;

