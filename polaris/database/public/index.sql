create function index(ltree, ltree) returns integer
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

alter function index(ltree, ltree) owner to postgres;

create function index(ltree, ltree, integer) returns integer
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

alter function index(ltree, ltree, integer) owner to postgres;

