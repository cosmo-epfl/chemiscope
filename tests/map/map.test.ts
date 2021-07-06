// Initialize JSDOM setup
import { default as setupJSDOM } from '../jsdom';
setupJSDOM();

// Add relevant classes/functions
import { PropertiesMap } from '../../src/map';
import { EnvironmentIndexer } from '../../src/indexer';
import { Target } from '../../src/dataset';
import { getByID } from '../../src/utils';

import { assert } from 'chai';
import { AxisOptions } from '../../src/map/options';

const DUMMY_PROPERTIES = {
    first: {
        target: 'structure' as Target,
        values: [1.1, 1.2],
    },
    second: {
        target: 'structure' as Target,
        values: [2.1, 2.2],
    },
    third: {
        target: 'structure' as Target,
        values: [3.1, 3.2],
    },
};

const DUMMY_MAP_SETTINGS = {
    x: {
        max: 0,
        min: 10,
        property: 'first',
        scale: 'linear',
    },
    y: {
        max: 0,
        min: 10,
        property: 'first',
        scale: 'linear',
    },
    z: {
        max: 0,
        min: 10,
        property: 'first',
        scale: 'linear',
    },
    color: {
        max: 0,
        min: 10,
        property: 'second',
        scale: 'linear',
    },
    symbol: '',
    palette: 'hsv (periodic)',
    size: {
        factor: 50,
        property: '',
    },
};

const DUMMY_STRUCTURES = [
    {
        size: 2,
        names: ['X', 'Y'],
        x: [0, 1],
        y: [0, 1],
        z: [0, 1],
    },
];

describe('Map', () => {
    it('can remove itself from DOM', () => {
        const root = document.createElement('div');
        document.body.appendChild(root);
        root.id = 'mapID';
        const indexer = new EnvironmentIndexer('structure', DUMMY_STRUCTURES);
        const map = new PropertiesMap(
            { id: 'mapID', settings: DUMMY_MAP_SETTINGS },
            indexer,
            DUMMY_PROPERTIES
        );
        console.log('after PropertiesMap');

        assert(root.innerHTML !== '');
        assert(document.body.innerHTML !== '');

        map.remove();
        assert(root.innerHTML === '');
        document.body.removeChild(root);
        // remove SVG element created by Plotly
        document.getElementById('js-plotly-tester')?.remove();
        assert(document.body.innerHTML === '');
    });

    // it('plotted property changes when changed in map settings', () => {
    //     const root = document.createElement('div');
    //     document.body.appendChild(root);
    //     root.id = 'mapID';
    //     const indexer = new EnvironmentIndexer('structure', DUMMY_STRUCTURES);
    //     const map = new PropertiesMap({ id: 'mapID', settings: {} }, indexer, DUMMY_PROPERTIES);

    //     checkPropertySelect(map['_options'].x, 'x');
    //     checkPropertySelect(map['_options'].y, 'y');
    //     checkPropertySelect(map['_options'].z, 'z');

    //     function checkPropertySelect(axisOptions: AxisOptions, axisName: string) {
    //         const selectElement = getByID<HTMLSelectElement>(`chsp-${axisName}`);
    //         selectElement.value = 'second';
    //         selectElement.dispatchEvent(new Event('change'));
    //         assert(axisOptions.property.value === 'second');
    //     }
    // });
});
