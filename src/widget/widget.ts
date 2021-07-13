// Copyright (c) Jakub Lala
// Distributed under the terms of the Modified BSD License.

import { DOMWidgetView } from '@jupyter-widgets/base';

import { default as $ } from 'jquery';
(window as any).$ = $;

// Import the CSS
import './bootstrap-iso.css';
import './widget.css';

import { DefaultVisualizer } from '../index';

export class ChemiscopeView extends DOMWidgetView {
    public render(): void {
        const element = this.el as HTMLElement;

        element.innerHTML = `
    <div class="bootstrap-iso">
        <div id="chemiscope-widget-container">
          <div id="chemiscope-meta-and-map">
            <div id="chemiscope-meta"></div>
            <div id="chemiscope-map" ></div>
          </div>
          <div id="chemiscope-structure-and-info">
            <div id="chemiscope-structure"></div>
            <div id="chemiscope-info"></div>
          </div>
        </div>
      </div>
      </div>`;

        const config = {
            map: element.querySelector('#chemiscope-map') as HTMLElement,
            info: element.querySelector('#chemiscope-info') as HTMLElement,
            meta: element.querySelector('#chemiscope-meta') as HTMLElement,
            structure: element.querySelector('#chemiscope-structure') as HTMLElement,
        };

        DefaultVisualizer.load(config, JSON.parse(this.model.get('value'))).then(
            (newVisualizer: DefaultVisualizer) => {
                this.visualizer = newVisualizer;
            }
        );
    }

    // TODO: when do we need to call this? Will jupyter automatically call it?
    public remove(): void {
        if (this.visualizer !== undefined) {
            this.visualizer.remove();
        }
    }

    private visualizer?: DefaultVisualizer;
}
