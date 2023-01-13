# GVAND

## Criando o `full-text search index`
```cypher
CREATE FULLTEXT INDEX movieSearchIndex FOR (n:Movie) ON EACH [n.title, n.plot]
```
