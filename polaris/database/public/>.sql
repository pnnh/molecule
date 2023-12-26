create operator > (procedure = ltree_gt, leftarg = ltree, rightarg = ltree, commutator = <, negator = <=, join = scalargtjoinsel, restrict = scalargtsel);

alter operator >(ltree, ltree) owner to postgres;

