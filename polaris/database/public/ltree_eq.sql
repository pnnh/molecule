create function ltree_eq(ltree, ltree) returns boolean
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

alter function ltree_eq(ltree, ltree) owner to postgres;

