create function subpath(ltree, integer, integer) returns ltree
    immutable
    strict
    parallel safe
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function subpath(ltree, integer, integer) owner to postgres;

create function subpath(ltree, integer) returns ltree
    immutable
    strict
    parallel safe
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function subpath(ltree, integer) owner to postgres;

