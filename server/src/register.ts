import type { Core } from '@strapi/strapi';
import { FIELD_ID, PLUGIN_ID } from '../../admin/src/pluginId';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  // register phase
  strapi.customFields.register({
    name: FIELD_ID,
    plugin: PLUGIN_ID,
    type: 'integer',
    inputSize: {
      default: 12,
      isResizable: false,
    }
  });
};

export default register;
