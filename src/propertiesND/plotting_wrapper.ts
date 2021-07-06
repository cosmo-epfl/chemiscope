import Plotly from './plotly/plotly-scatter';

import { Data } from './plotly/plotly-scatter';

/**
 * wrapper around scatter plots of Plotly.js for 2D and 3D properties
 */
export function plot_propertiesND(
    x: number[],
    y: number[],
    z: number[],
    my_div: HTMLElement,
    title: string,
    xlabel?: string,
    ylabel?: string,
    zlabel?: string
): void {
    const trace = {
        x: x,
        y: y,
        z: z,
        type: 'scatter',
        mode: 'lines',
    };

    const layout = {
        title: title,
        xref: 'paper',
        yref: 'paper',
        xaxis: {
            title: xlabel,
        },
        yaxis: {
            title: ylabel,
        },
        zaxis: {
            title: zlabel,
        },
        showlegend: false,
        x: 0.2,
        legend: {
            y: 0.5,
        },
        autosize: true,
        margin: {
            l: 50,
            r: 50,
            b: 100,
            t: 100,
            pad: 4,
        },
        width: 300,
        height: 300, // to be changed after deciding on the popup fromat
        tracetoggle: false,
    };

    // change the type of the plot if there is a 3rd dimension
    if (z !== undefined) {
        trace['type'] = 'scatter3d';
        trace['mode'] = 'markers';
    }

    const config = {
        displayModeBar: false,
        responsive: true,
    };

    const data = [trace] as Data[];

    void Plotly.plot(my_div, data, layout, config);
}
