create operator family ltree_ops using btree;

alter operator family ltree_ops using btree add
    operator 3 =(ltree, ltree),
    operator 2 <=(ltree, ltree),
    operator 5 >(ltree, ltree),
    operator 1 <(ltree, ltree),
    operator 4 >=(ltree, ltree),
    function 1(ltree, ltree) ltree_cmp(ltree, ltree);

alter operator family ltree_ops using btree owner to postgres;

create operator class ltree_ops default for type ltree using btree as
    operator 1 <(ltree, ltree),
    operator 5 >(ltree, ltree),
    operator 3 =(ltree, ltree),
    operator 2 <=(ltree, ltree),
    operator 4 >=(ltree, ltree),
    function 1(ltree, ltree) ltree_cmp(ltree, ltree);

alter operator class ltree_ops using btree owner to postgres;

