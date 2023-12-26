create operator ?@> (procedure = _ltree_extract_isparent, leftarg = ltree[], rightarg = ltree);

alter operator ?@>(ltree[], ltree) owner to postgres;

