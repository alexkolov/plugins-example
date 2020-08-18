const model = {
  data: {
    tabs: ['tab1', 'tab2', 'tab3'],
    tabdata: {
      tab1: {
        title: 'Marketing',
        icon: 'icon-marketing',
        active: ['plugin1', 'plugin2', 'plugin4'],
        disabled: ['plugin3'],
        inactive: ['plugin5', 'plugin6']
      },
      tab2: {
        title: 'Finance',
        icon: 'icon-finance',
        active: ['plugin7', 'plugin8'],
        disabled: ['plugin9'],
        inactive: ['plugin10']
      },
      tab3: {
        title: 'Personnel',
        icon: 'icon-people',
        active: ['plugin11'],
        disabled: ['plugin12'],
        inactive: ['plugin13']
      }
    },
    plugins: {
      plugin1: {
        title: 'Plugin 1',
        description: 'Enim cillum tempor veniam do laboris excepteur laborum fugiat aute magna cillum.'
      },
      plugin2: {
        'title': 'Plugin 2',
        'description': 'Proident sunt consequat exercitation incididunt cupidatat quis ut ut eu ullamco nisi excepteur aliqua.'
      },
      plugin3: {
        title: 'Plugin 3',
        description: 'Amet ea quis qui reprehenderit laborum aute magna incididunt et dolore.'
      },
      plugin4: {
        title: 'Plugin 4',
        description: 'Sunt culpa labore consequat eu veniam laborum.'
      },
      plugin5: {
        title: 'Plugin 5',
        description: 'Proident laborum sint nisi enim non aliqua incididunt dolor voluptate tempor.'
      },
      plugin6: {
        title: 'Plugin 6',
        description: 'Qui cillum velit elit incididunt excepteur nostrud occaecat.'
      },
      plugin7: {
        title: 'Plugin 7',
        description: 'Culpa excepteur aliquip adipisicing sunt sunt proident aute eiusmod.'
      },
      plugin8: {
        title: 'Plugin 8',
        description: 'Eiusmod ex labore cillum elit.'
      },
      plugin9: {
        title: 'Plugin 9',
        description: 'Ut sit sit fugiat qui ullamco ea ea id qui esse magna.'
      },
      plugin10: {
        title: 'Plugin 10',
        description: 'Aliqua tempor nostrud occaecat enim nulla proident nostrud enim adipisicing pariatur velit.'
      },
      plugin11: {
        title: 'Plugin 11',
        description: 'Consectetur sit amet velit cillum sunt cillum sunt.'
      },
      plugin12: {
        title: 'Plugin 12',
        description: 'Exercitation in aute ut ex aliqua ea.'
      },
      plugin13: {
        title: 'Plugin 13',
        description: 'Dolor laboris culpa ipsum aliqua velit mollit.'
      }
    }
  },
  errors: null
};

const addPluginId = (routeId, status, pluginId) => {
  model.data.tabdata[routeId][status].push(pluginId);
};

const removePluginId = (routeId, status, pluginId) => {
  const newValue = model.data.tabdata[routeId][status].filter(
    (id) => id !== pluginId
  );
  model.data.tabdata[routeId][status] = newValue;
};

const init = () => {
  model.data.tabs.forEach((tab) => {
    const { active, inactive, disabled } = model.data.tabdata[tab];

    const isAbondened = (id) => {
      return !active.includes(id) && !inactive.includes(id);
    };

    disabled.forEach((id) => {
      if (isAbondened(id)) {
        inactive.push(id);
      }
    })
  });
};

const loadRoutes = () => {
  const { tabs, tabdata } = model.data;

  const route = (tab, { title, icon }) => (
    { id: tab, title, icon }
  );

  const routes = [];
  tabs.forEach((tab) => routes.push(
    route(tab, tabdata[tab])
  ));

  return routes
};

const loadPlugins = (routeId) => {
  if (!model.data.tabs.includes(routeId)) {
    return [];
  }

  const tabdata = model.data.tabdata[routeId];

  let plugins = [];

  const parsePlugin = (id, isActive, isDisabled) => (
    {
      id,
      isActive,
      isDisabled,
      ...model.data.plugins[id]
    }
  );

  ['active', 'inactive'].forEach(
    (status) => tabdata[status].forEach(
      (id) => plugins.push(
        parsePlugin(
          id,
          status === 'active',
          tabdata.disabled.includes(id)
        )
      )
    )
  );

  return plugins.sort((a, b) => a.id.localeCompare(b.id));
};

const updatePlugin = (routeId, pluginId, diff) => {
  if (diff.hasOwnProperty('isActive')) {
    if (diff.isActive) {
      addPluginId(routeId, 'active', pluginId);
      removePluginId(routeId, 'inactive', pluginId);
    } else {
      removePluginId(routeId, 'active', pluginId);
      addPluginId(routeId, 'inactive', pluginId);
    }
  }
};

const updatePlugins = (diff) => {
  if (diff.hasOwnProperty('isDisabled')) {
    model.data.tabs.forEach((tab) => {
      let disabledIds;
      if (diff.isDisabled) {
        const { active, inactive, disabled } = model.data.tabdata[tab];
        disabledIds = [
          ...new Set([...active, ...inactive, ...disabled])
        ];
      } else {
        disabledIds = [];
      }
      model.data.tabdata[tab].disabled = disabledIds;
    });
  }
};

module.exports = {
  init,
  loadRoutes,
  loadPlugins,
  updatePlugin,
  updatePlugins
};
