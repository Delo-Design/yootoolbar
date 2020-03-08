window.jYProExtraToolbar = {

    /**
     * Dom object toolbar
     */
    element: null,

    /**
     * Dom object
     */
    element_root_buttons: null,


    /**
     *
     * @type {{}}
     */
    maps_buttons: {},


    /**
     *
     * @type {string}
     */
    toolbar_status: 'show',


    /**
     *
     */
    init: function () {
        let yo_preview = document.querySelector('.yo-preview');
        this.element = this.createElement('div', {'class': 'jyproextra-toolbar'})
            .addChild('div', {
                'class': 'uk-position-relative',
                'data-uk-slider': ''
            })
                this.element_root_buttons = this.element.add('ul', {'class': 'uk-slider-items uk-grid-medium uk-child-width-auto'});
                this.element = this.element_root_buttons.getParent()
                .add('a', {
                    'class': 'uk-position-center-left uk-position-small',
                    'href': '#',
                    'uk-slidenav-previous': '',
                    'uk-slider-item': 'previous',
                })
                .add('a', {
                    'class': 'uk-position-center-right uk-position-small',
                    'href': '#',
                    'uk-slidenav-next': '',
                    'uk-slider-item': 'next',
                });

        this.element = this.element.build();
        this.element_root_buttons = this.element.querySelector('ul');

        let self = this;
        let wait_load_yo_preview = setInterval(function () {
            yo_preview =  document.querySelector('.yo-preview');
            if(yo_preview !== null) {
                yo_preview.classList.add('has-jyproextra-toolbar');
                yo_preview.appendChild(self.element);
                clearInterval(wait_load_yo_preview);
            }
        }, 300);

    },


    /**
     *
     *
     * @param item {label: string, id: string, icon: string, events: object}
     * @param parent
     */
    appendButton: function (item, parent) {
        let button;

        if(parent !== undefined && parent !== null) {
            button = this.createElement('li', {'class': 'jytbtn-' + item.id});
        } else {
            button = this.createElement('button', {'class': 'uk-button uk-button-text jytbtn-' + item.id});
        }


        if(parent !== undefined && parent !== null) {
            let button_parent = this.element.querySelector('.jytbtn-' + parent);
            if(button_parent !== null) {
                let wrap = button_parent.closest('div'),
                ul = wrap.querySelector('ul'),
                li;

                if(ul === null || ul === undefined) {
                    button_parent.innerHTML += '<i data-uk-icon="chevron-up"></i>';
                    ul = this.createElement('div', {'data-uk-dropdown': 'mode: click'})
                        .add('ul', {'class': 'uk-nav uk-dropdown-nav'})
                        .build();
                    wrap.appendChild(ul);
                    ul = wrap.querySelector('ul');
                }

                button = this.createElement('a', {'class': 'jytbtn-' + item.id});
                if(item.icon !== undefined && item.icon !== '')
                {
                    button.add('i', {'data-uk-icon': 'icon: ' + item.icon});
                }
                button.add('span', {}, item.label);
                button = button.build();

                li = this.createElement('li', {}, button).build();
                ul.appendChild(li);
            }

        } else {

            button = this.createElement('button', {'class': 'uk-button uk-button-text jytbtn-' + item.id});
            if(item.icon !== undefined && item.icon !== '')
            {
                button.add('i', {'data-uk-icon': 'icon: ' + item.icon});
            }
            button.add('span', {}, item.label);
            button = button.build();

            let wrap = this.createElement('li')
                .addChild('div', {'class': 'uk-inline'}, button)
                    .getParent();

            this.element_root_buttons.append(wrap.build());
        }

        if(item.events !== undefined) {
            for (let event in item.events) {
                button.addEventListener(event, item.events[event]);
            }
        }

        return button;
    },


    /**
     *
     * @param maps
     */
    appendButtons: function (maps) {
        for(let i=0;i<maps.length;i++) {
            this.appendButton(maps[i]);
            if(maps[i].items !== undefined) {
                for(let j=0;j<maps[i].items.length;j++) {
                    this.appendButton(maps[i].items[j], maps[i].id);
                }
            }
        }
    },


    /**
     *
     * @param id
     */
    removeButton: function (id) {

    },


    /**
     *
     * @param id
     */
    toggleButton: function (id) {

    },


    /**
     *
     */
    show: function () {
        this.toolbarStatus = 'show';
    },


    /**
     *
     */
    hide: function () {
        this.toolbarStatus = 'hide';
    },

    /**
     * Создание вложенных DOM элементов
     *
     * @param tag
     * @param attr
     * @param innerHtml
     * @returns {{add: add, build: build, el: *, child: []}}
     */
    createElement: function(tag, attr, innerHtml) {
        let self = this;
        let element = document.createElement(tag);

        for(keyAttr in attr) {
            if(keyAttr === 'events') {
                let eventsLength = attr[keyAttr].length;
                for(let i=0;i<eventsLength;i++) {
                    element.addEventListener(attr[keyAttr][i][0], attr[keyAttr][i][1]);
                }
                continue;
            }

            element.setAttribute(keyAttr, attr[keyAttr]);
        }

        if(innerHtml !== undefined && innerHtml !== null) {

            if(typeof innerHtml === 'function') {
                element.innerHTML = innerHtml();
            }

            if(typeof innerHtml === 'string') {
                element.innerHTML = innerHtml;
            }

            if(typeof innerHtml === 'object') {
                element.append(innerHtml);
            }

        }

        return {
            el: element,
            parent: undefined,
            child: [],
            getParent: function() {
                return this.parent;
            },
            setParent: function(parent) {
                this.parent = parent;
                return this;
            },
            add: function (tag, attr, innerHtml) {
                this.child.push(self.createElement(tag, attr, innerHtml).setParent(this));
                return this;
            },
            addChild: function (tag, attr, innerHtml) {
                this.child.push(self.createElement(tag, attr, innerHtml).setParent(this));
                return this.child[ this.child.length - 1];
            },
            build: function () {
                var buildElement = this.el;

                if(this.child.length > 0) {

                    for(var i=0;i<this.child.length;i++) {
                        buildElement.appendChild(this.child[i].build());
                    }

                    return buildElement;
                } else {
                    return buildElement;
                }

            },
        }
    }

};


document.addEventListener('DOMContentLoaded', function () {
    window.jYProExtraToolbar.init();


    jYProExtraToolbar.appendButtons([
        {
            'label': 'Файлы',
            'id': 'files',
            'icon': 'folder',
            'events': {
                'click': function () {
                    //Qauntummanager.open();
                }
            },
            'items': [
                {
                    'label': 'Область 1',
                    'id': 'scopes-1',
                    'icon': 'folder',
                    'events': {
                        'click': function () {
                            //Qauntummanager.open({'scope': 'scope-1'});
                        }
                    },
                },
                {
                    'label': 'Область 2',
                    'id': 'scopes-2',
                    'icon': 'folder',
                    'events': {
                        'click': function () {
                            //Qauntummanager.open({'scope': 'scope-2'});
                        }
                    }
                }
            ]
        }
    ]);

    for (let i=0;i<15;i++) {
        jYProExtraToolbar.appendButton({
            'label': 'Элемент',
            'id': 'item-1',
        });
    }

});