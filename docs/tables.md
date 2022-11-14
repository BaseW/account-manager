```mermaid
erDiagram

ACCOUNT {
  id int [pk]
  name varchar
}

TAG {
  id int [pk]
  name varchar
}

ACCOUNT_TAG {
  account_id int [pk]
  tag_id int [pk]
}
```
