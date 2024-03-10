create function subltree(ltree, integer, integer) returns ltree
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

alter function subltree(ltree, integer, integer) owner to postgres;

