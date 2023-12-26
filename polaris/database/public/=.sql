create operator = (procedure = ltree_eq, leftarg = ltree, rightarg = ltree, commutator = =, negator = <>, join = eqjoinsel, restrict = eqsel, merges);

alter operator =(ltree, ltree) owner to postgres;

