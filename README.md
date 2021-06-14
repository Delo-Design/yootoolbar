# Тулбар для YOOtheme Pro

### Что делает плагин?
Добавляет в интерфейс YOOtheme Pro тулбар вниз страницы. Туда вы можете с помощью javascript заносить свои кнопки.

### Как добавить кнопку
```javascript
if(window.YooExtendToolbar !== undefined) {
        YooExtendToolbar.appendButton({
            'label': 'Файлы', // название кнопки
            'id': 'files', // идентификатор для возможного манипулиярования будущего
            'icon': 'folder', // иконка из uikit для кнопки
            'events': { // перечисление событий по кнопке
                'click': function () {
                    // какие-то действия
                }
            },
        });
    }
```