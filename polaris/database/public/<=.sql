create operator <= (procedure = ltree_le, leftarg = ltree, rightarg = ltree, commutator = >=, negator = >, join = scalarlejoinsel, restrict = scalarlesel);

alter operator <=(ltree, ltree) owner to postgres;

