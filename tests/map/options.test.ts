import { MapOptions, AxisOptions } from '../../src/map/options';
import { getByID } from '../../src/utils';

import { assert } from 'chai';

let KARMA_INSERTED_HTML: string;

const DUMMY_PROPERTIES = {
    first: {
        values: [],
    },
    second: {
        values: [],
    },
    third: {
        values: [],
    },
};
const DUMMY_CALLBACK = () => {
    return { top: 0, left: 0 };
};

describe('MapOptions', () => {
    before(() => {
        // store karma's default HTML
        KARMA_INSERTED_HTML = document.body.innerHTML;
    });

    it('can remove itself from DOM', () => {
        const root = document.createElement('div');
        const options = new MapOptions(root, DUMMY_PROPERTIES, DUMMY_CALLBACK);
        assert(root.innerHTML !== '');

        options.remove();
        assert(root.innerHTML === '');
        assert(document.body.innerHTML === KARMA_INSERTED_HTML);
    });

    it('selected scale label for min/max switches between linear and log', () => {
        const root = document.createElement('div');
        const options = new MapOptions(root, DUMMY_PROPERTIES, DUMMY_CALLBACK);

        checkScaleLabel(options.x, 'x');
        checkScaleLabel(options.y, 'y');
        checkScaleLabel(options.z, 'z');

        function checkScaleLabel(axisOptions: AxisOptions, axisName: string): void {
            const min = getByID(`chsp-${axisName}-min-label`);
            const max = getByID(`chsp-${axisName}-max-label`);
            const selectElement = getByID<HTMLSelectElement>(`chsp-${axisName}-scale`);

            // change from linear (default) to log scale
            selectElement.value = 'log';
            selectElement.dispatchEvent(new Event('change'));

            assert(axisOptions.scale.value === 'log');

            options.setLogLabel(axisOptions, axisName);
            assert(min.innerHTML === 'min: 10^');
            assert(max.innerHTML === 'max: 10^');

            // change back from log to linear
            selectElement.value = 'linear';
            selectElement.dispatchEvent(new Event('change'));

            assert(axisOptions.scale.value === 'linear');

            options.setLogLabel(axisOptions, axisName);
            assert(min.innerHTML === 'min:');
            assert(max.innerHTML === 'max:');
        }
    });

    it('selected property changes when changed', () => {
        const root = document.createElement('div');
        const options = new MapOptions(root, DUMMY_PROPERTIES, DUMMY_CALLBACK);

        checkPropertySelect(options.x, 'x');
        checkPropertySelect(options.y, 'y');
        checkPropertySelect(options.z, 'z');
        checkPropertySelect(options.color, 'color');

        function checkPropertySelect(axisOptions: AxisOptions, axisName: string) {
            const selectElement = getByID<HTMLSelectElement>(`chsp-${axisName}`);
            selectElement.value = 'second';
            selectElement.dispatchEvent(new window.Event('change'));
            assert(axisOptions.property.value === 'second');
        }
    });

    it('selected range changes when changed', () => {
        const root = document.createElement('div');
        const options = new MapOptions(root, DUMMY_PROPERTIES, DUMMY_CALLBACK);

        checkRangeSelect(options.x, 'x');
        checkRangeSelect(options.y, 'y');
        checkRangeSelect(options.z, 'z');

        function checkRangeSelect(axisOptions: AxisOptions, axisName: string) {
            const minSelectElement = getByID<HTMLSelectElement>(`chsp-${axisName}-min`);
            const maxSelectElement = getByID<HTMLSelectElement>(`chsp-${axisName}-max`);

            minSelectElement.value = '0.01';
            minSelectElement.dispatchEvent(new window.Event('change'));
            assert(axisOptions.min.value === 0.01);

            maxSelectElement.value = '1.01';
            maxSelectElement.dispatchEvent(new window.Event('change'));
            assert(axisOptions.max.value === 1.01);
        }
    });

    it('selected size changes when changed', () => {
        const root = document.createElement('div');
        const options = new MapOptions(root, DUMMY_PROPERTIES, DUMMY_CALLBACK);
        const selectElement = getByID<HTMLSelectElement>(`chsp-size`);
        selectElement.value = 'second';
        selectElement.dispatchEvent(new window.Event('change'));
        assert(options.size.property.value === 'second');
    });
});
