import { CollectionConfig } from 'payload/types';

const Tasks: CollectionConfig = {
  slug: 'tasks',
  admin: {
    useAsTitle: 'title',
  },
//   access: {
//     create: ({ req: { user } }) => !!user, // Only authenticated users can create tasks
//     read: ({ req: { user } }) => !!user, // Only authenticated users can read tasks
//     update: ({ req: { user } }) => !!user, // Only authenticated users can update tasks
//     delete: ({ req: { user } }) => !!user, // Only authenticated users can delete tasks
//   },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: 'Pending',
          value: 'pending',
        },
        {
          label: 'In Progress',
          value: 'in_progress',
        },
        {
          label: 'Completed',
          value: 'completed',
        },
      ],
      required: true,
      defaultValue: 'pending',
    },
  ],
};

export default Tasks;
