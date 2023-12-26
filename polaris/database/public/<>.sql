create operator <> (procedure = ltree_ne, leftarg = ltree, rightarg = ltree, commutator = <>, negator = =, join = neqjoinsel, restrict = neqsel);

alter operator <>(ltree, ltree) owner to postgres;

