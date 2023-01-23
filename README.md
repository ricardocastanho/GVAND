# GVAND

## Criando o `full-text search index`
```cypher
CREATE FULLTEXT INDEX movieSearchIndex FOR (n:Movie|Actor) ON EACH [n.title, n.plot, n.name]
```
