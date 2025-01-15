import { db } from '@penx/local-db'
import { uniqueId } from '@penx/unique-id'

const name = '$penx_builtin_extension'

export async function installBuiltinExtension() {
  let ext = (await db.getExtensionByName(name))!

  if (ext) return

  await db.createExtension({
    id: uniqueId(),
    spaceId: '',
    name,
    title: 'PenX',
    version: '0.0.0',
    assets: {},
    isDeveloping: false,
    icon: '/logo/128x128.png',
    commands: [
      {
        name: 'today',
        title: 'Today',
        icon: {
          name: 'solar--calendar-linear',
          className: 'bg-gradient-to-r from-red-500 to-pink-500',
        },
        subtitle: '',
        description: '',
        code: '',
        isBuiltIn: true,
      },
      {
        name: 'posts',
        title: 'Posts',
        icon: {
          name: 'solar--pen-bold',
          className: 'bg-gradient-to-r from-violet-500 to-fuchsia-500',
        },
        subtitle: '',
        description: '',
        code: '',
        isBuiltIn: true,
      },
      {
        name: 'pages',
        title: 'Pages',
        icon: {
          name: 'mage--file-2',
          className: 'bg-gradient-to-r from-green-500 to-blue-500',
        },
        subtitle: '',
        description: '',
        code: '',
        isBuiltIn: true,
      },
      // {
      //   name: 'databases',
      //   title: 'Databases',
      //   icon: '/icons/marketplace.svg',
      //   subtitle: '',
      //   description: '',
      //   code: '',
      //   isBuiltIn: true,
      // },
      {
        name: 'marketplace',
        title: 'marketplace',
        icon: '/icons/marketplace.svg',
        subtitle: '',
        description: '',
        code: '',
        isBuiltIn: true,
      },
      {
        name: 'settings',
        title: 'Settings',
        icon: {
          name: 'mingcute:settings-2-line',
          className: 'bg-gradient-to-r from-lime-500 to-teal-500',
        },
        subtitle: '',
        description: '',
        code: '',
        isBuiltIn: true,
      },
      // {
      //   name: 'marketplace',
      //   title: 'marketplace',
      //   icon: '/icons/marketplace.svg',
      //   subtitle: '',
      //   description: '',
      //   code: '',
      //   isBuiltIn: true,
      // },
      // {
      //   name: 'create-database',
      //   title: 'Create Database',
      //   icon: '/icons/docs.svg',
      //   subtitle: '',
      //   description: '',
      //   code: '',
      //   isBuiltIn: true,
      // },
      // {
      //   name: 'clipboard-history',
      //   title: 'Clipboard History',
      //   icon: '/icons/copy.svg',
      //   subtitle: '',
      //   description: '',
      //   code: '',
      //   isBuiltIn: true,
      // },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  })
}
