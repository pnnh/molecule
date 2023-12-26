create function ltree_addltree(ltree, ltree) returns ltree
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

alter function ltree_addltree(ltree, ltree) owner to postgres;

