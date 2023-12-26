create operator ?<@ (procedure = _ltree_extract_risparent, leftarg = ltree[], rightarg = ltree);

alter operator ?<@(ltree[], ltree) owner to postgres;

