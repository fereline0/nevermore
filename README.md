## Nevermore - форум для разработчиков

Для того, что бы протестировать проект необходимо иметь локально или глобально развернутую базу данных MySQL и NodeJS.

```bash
# Для начала необходимо установить Node модули
npm install
```

После необходимо заполнить .env файл подобно экземпляру, который можно найти в дериктории проекта.

```bash
# Далее выполняем миграцию в запущенную базу данных
npx prisma migrate dev --name init
# И запускаем проект на локальном хосте
npm run dev
```

Форум содержит в себе

- гибкую систему ролей и полномочий
- удобную систему комментирования с бесконечным уровнем вложенности

При его разработке учитывалась поддержка всех устройств, поэтому форум полностью адаптивен

![alt text](https://github.com/fereline0/nevermore/blob/main/public/preview/users[id].png)

![alt text](https://github.com/fereline0/nevermore/blob/main/public/preview/users.png)

![alt text](https://github.com/fereline0/nevermore/blob/main/public/preview/modal.png)

![alt text](https://github.com/fereline0/nevermore/blob/main/public/preview/forums[id].png)

![alt text](https://github.com/fereline0/nevermore/blob/main/public/preview/users[id](mobile).png)
