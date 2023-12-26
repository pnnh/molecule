create function ltree_cmp(ltree, ltree) returns integer
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

alter function ltree_cmp(ltree, ltree) owner to postgres;

