```mermaid
erDiagram

ACCOUNT {
  int id
  string name
}

TAG {
  int id
  string name
}

ACCOUNT_TAG {
  int account_id
  int tag_id
}
```
