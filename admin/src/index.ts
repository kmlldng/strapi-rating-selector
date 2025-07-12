import { getTranslation } from './utils/getTranslation';
import { PLUGIN_ID, FIELD_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';
import * as yup from 'yup';

export default {
  register(app: any) {
    app.customFields.register({
      name: FIELD_ID,
      pluginId: PLUGIN_ID,
      type: 'json', // the field will be stored as a json
      intlLabel: {
        id: PLUGIN_ID + '.' + FIELD_ID + '.label',
        defaultMessage: 'Rating Selector',
      },
      intlDescription: {
        id: PLUGIN_ID + '.' + FIELD_ID + '.description',
        defaultMessage:
          'Allows user to choose rating',
      },
      default: null,
      isResizable: true,
      icon: PluginIcon,
      components: {
        Input: async () => import('./components/Input'),
      },
      options: {
        base: [
          /*
            Declare settings to be added to the "Base settings" section
            of the field in the Content-Type Builder
          */
          {
            sectionTitle: {
              // Add a "Format" settings section
              id: 'rating.selector.options',
              defaultMessage: 'Custom field configuration',
            },
            items: [
              {
                name: 'options.min',
                type: 'number',
                intlLabel: {
                  id: 'rating.selector.option.min.label',
                  defaultMessage: 'Minimum Value',
                },
                intlDescription: {
                  id: 'rating.selector.option.min.description',
                  defaultMessage: 'Minimum rating value',
                },
                required: true,
                value: 1,
                defaultValue: 1,
              },
              {
                name: 'options.max',
                type: 'number',
                intlLabel: {
                  id: 'rating.selector.option.max.label',
                  defaultMessage: 'Maximum Value',
                },
                intlDescription: {
                  id: 'rating.selector.option.max.description',
                  defaultMessage: 'Maximum rating value',
                },
                value: 10,
                required: true,
                defaultValue: 10,
              },
              // {
              //   name: 'options.label',
              //   type: 'text',
              //   intlLabel: {
              //     id: 'rating.selector.option.label.label',
              //     defaultMessage: 'Field Label',
              //   },
              //   intlDescription: {
              //     id: 'rating.selector.option.label.description',
              //     defaultMessage: 'Custom label for the field',
              //   },
              //   required: true,
              //   defaultValue: 'Rating Label',
              // },
            ],
          },
        ],
        validator: (options: any) => ({
          min: yup
            .number()
            .required({
              id: 'rating.selector.option.min.error',
              defaultMessage: 'Min is required',
            })
            .typeError({
              id: 'rating.selector.option.min.error',
              defaultMessage: 'Min must be a number',
            })
          ,
          max: yup
            .number()
            .required({
              id: 'rating.selector.option.max.error',
              defaultMessage: 'Max is required',
            })
            .typeError({
              id: 'rating.selector.option.max.error',
              defaultMessage: 'Max must be a number',
            })
            .moreThan(
              yup.ref('min'),
              'Max must be greater than Min'
            )
          ,
          // label: yup.string().required({
          //   id: 'rating.selector.option.label.error',
          //   defaultMessage: 'Label is required',
          // }),
        }),
      },
    })
    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });
  },

  async registerTrads({ locales }: { locales: string[] }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`);

          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};
