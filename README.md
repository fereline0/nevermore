## Nevermore - форум разработчиков

Для того, что бы протестировать проект необходимо иметь локально или глобально развернутую базу данных Postgresql и NodeJS.

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
- поддержку мультиязычности
- набор средств для комфортного администрирования
- интуитивно понятный дизайн

При его разработке учитывалась поддержка всех устройств, поэтому форум полностью адаптивен

![alt text](https://github.com/fereline0/nevermore/blob/main/public/preview/user.png)

![alt text](https://github.com/fereline0/nevermore/blob/main/public/preview/createArticle.png)

![alt text](https://github.com/fereline0/nevermore/blob/main/public/preview/forum.png)

![alt text](https://github.com/fereline0/nevermore/blob/main/public/preview/userMobile.png)

![alt text](https://github.com/fereline0/nevermore/blob/main/public/preview/usersMobile.png)

![alt text](https://github.com/fereline0/nevermore/blob/main/public/preview/modalWindow.png)

![alt text](https://github.com/fereline0/nevermore/blob/main/public/preview/modalWindowMobile.png)

![alt text](https://github.com/fereline0/nevermore/blob/main/public/preview/notificationsMobile.png)

![alt text](https://github.com/fereline0/nevermore/blob/main/public/preview/menuMobile.png)

![alt text](https://github.com/fereline0/nevermore/blob/main/public/preview/forumsMobile.png)
