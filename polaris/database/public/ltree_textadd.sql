create function ltree_textadd(text, ltree) returns ltree
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

alter function ltree_textadd(text, ltree) owner to postgres;

