## Mashup Anonymous toy project

- [ERD cloud link](https://www.erdcloud.com/d/jG63AkvDE3hSo4qwL)

### Test Database setup
Execute `docker-compose up -d` command where the compose yaml file exists.

```yaml
version: "3.7"
services:
  db:
    image: mysql:5.7
    restart: always
    container_name: mysql-test
    ports:
      - "3306:3306"
    environment:
      - MYSQL_DATABASE=test
      - MYSQL_ROOT_PASSWORD=test
      - TZ=Asia/Seoul
```
