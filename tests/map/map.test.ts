import { PropertiesMap } from '../../src/map';
import { EnvironmentIndexer } from '../../src/indexer';
import { Target } from '../../src/dataset';
import { getByID } from '../../src/utils';
import { AxisOptions } from '../../src/map/options';

import { assert } from 'chai';

let KARMA_INSERTED_HTML: string;

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
    before(() => {
        // store karma's default HTML
        KARMA_INSERTED_HTML = document.body.innerHTML;
    });

    it('can remove itself from DOM', () => {
        const root = document.createElement('div');
        const indexer = new EnvironmentIndexer('structure', DUMMY_STRUCTURES);
        const map = new PropertiesMap(
            { element: root, settings: DUMMY_MAP_SETTINGS },
            indexer,
            DUMMY_PROPERTIES
        );

        assert(root.innerHTML !== '');
        assert(document.body.innerHTML !== '');

        map.remove();
        assert(root.innerHTML === '');

        // remove SVG element created by Plotly
        document.getElementById('js-plotly-tester')?.remove();
        assert(document.body.innerHTML === KARMA_INSERTED_HTML);
    });

    // it('color range resets when clicked', () => {
    //     const root = document.createElement('div');
    //     const indexer = new EnvironmentIndexer('structure', DUMMY_STRUCTURES);
    //     const map = new PropertiesMap(
    //         { element: root, settings: DUMMY_MAP_SETTINGS },
    //         indexer,
    //         DUMMY_PROPERTIES
    //     );
    //     const minSelectElement = getByID<HTMLSelectElement>(`chsp-color-min`);
    //     const maxSelectElement = getByID<HTMLSelectElement>(`chsp-color-max`);
    //     const originalMin = minSelectElement.value;
    //     const originalMax = maxSelectElement.value;

    //     const colorSelectElement = getByID<HTMLSelectElement>(`chsp-color`);
    //     colorSelectElement.value = 'third';
    //     colorSelectElement.dispatchEvent(new window.Event('change'));

    //     console.log(originalMin);

    //     minSelectElement.value = '-0.01';
    //     maxSelectElement.value = '0.01';

    //     map['_colorReset'].onclick();
    //     assert(minSelectElement.value === originalMin);
    //     assert(maxSelectElement.value === originalMax);
    // });
});

/** Removes the map and an additional HTML element creted by Plotly */
function removeMap(map: PropertiesMap): void {
    map.remove();
    document.getElementById('js-plotly-tester')?.remove();
}
