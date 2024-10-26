import { CollectionConfig } from 'payload/types';

const Tasks: CollectionConfig = {
  slug: 'tasks',
  admin: {
    useAsTitle: 'title',
  },
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
          value: 'Pending',
        },
        {
          label: 'In Progress',
          value: 'In_Progress',
        },
        {
          label: 'Completed',
          value: 'Completed',
        },
      ],
      required: true,
      defaultValue: 'Pending',
    },
  ],
};

export default Tasks;
