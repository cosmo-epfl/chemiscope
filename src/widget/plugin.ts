// // Copyright (c) Jakub Lala
// // Distributed under the terms of the Modified BSD License.

// import { Application, IPlugin } from '@phosphor/application';

// import { Widget } from '@phosphor/widgets';

// import { IJupyterWidgetRegistry } from '@jupyter-widgets/base';

// import * as widgetExports from './widget';

// import { MODULE_NAME, MODULE_VERSION } from './version';

// const EXTENSION_ID = 'chemiscope-widget:plugin';

// /**
//  * The example plugin.
//  */
// const examplePlugin: IPlugin<Application<Widget>, void> = {
//   id: EXTENSION_ID,
//   requires: [IJupyterWidgetRegistry, 'jquery'],
//   activate: activateWidgetExtension,
//   autoStart: false,
// } as unknown as IPlugin<Application<Widget>, void>;
// // the "as unknown as ..." typecast above is solely to support JupyterLab 1
// // and 2 in the same codebase and should be removed when we migrate to Lumino.

// export default examplePlugin;

// /**
//  * Activate the widget extension.
//  */
// function activateWidgetExtension(
//   app: Application<Widget>,
//   registry: IJupyterWidgetRegistry
// ): void {
//   registry.registerWidget({
//     name: MODULE_NAME,
//     version: MODULE_VERSION,
//     exports: widgetExports,
//   });
// }
