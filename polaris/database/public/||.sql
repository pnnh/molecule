create operator || (procedure = ltree_addltree, leftarg = ltree, rightarg = ltree);

alter operator ||(ltree, ltree) owner to postgres;

create operator || (procedure = ltree_addtext, leftarg = ltree, rightarg = text);

alter operator ||(ltree, text) owner to postgres;

create operator || (procedure = ltree_textadd, leftarg = text, rightarg = ltree);

alter operator ||(text, ltree) owner to postgres;

