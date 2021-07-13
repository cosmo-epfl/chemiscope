# -*- coding: utf-8 -*-
import json

# TODO: check whether all of these are installed with a jupyter installation
# TODO: only load this module if jupyter is installed
# from IPython.display import display_html
from ipywidgets import DOMWidget, ValueWidget, register
from traitlets import Unicode

from .input import create_input


module_name = "chemiscope-widget"
# TODO
module_version = "^0.1.0"


@register
class ChemiscopeWidget(DOMWidget, ValueWidget):
    _view_name = Unicode("ChemiscopeView").tag(sync=True)
    _view_module = Unicode(module_name).tag(sync=True)
    _view_module_version = Unicode(module_version).tag(sync=True)

    # TODO: better name
    value = Unicode().tag(sync=True)

    def __init__(self, meta, frames, properties, cutoff=None):
        super().__init__()
        data = create_input(
            frames=frames, properties=properties, meta=meta, cutoff=cutoff
        )
        self.value = json.dumps(data)


def display(frames, properties, cutoff=None):
    """TODO"""
    # use an empty name since we don't know what the dataset contains
    meta = {"name": " "}
    return ChemiscopeWidget(
        frames=frames, properties=properties, meta=meta, cutoff=cutoff
    )


def _jupyter_labextension_paths():
    """Called by Jupyter Lab Server to detect if it is a valid labextension and
    to install the widget
    Returns
    =======
    src: Source directory name to copy files from. Webpack outputs generated files
        into this directory and Jupyter Lab copies from this directory during
        widget installation
    dest: Destination directory name to install widget files to. Jupyter Lab copies
        from `src` directory into <jupyter path>/labextensions/<dest> directory
        during widget installation
    """
    print("_jupyter_labextension_paths called")
    return [
        {
            "src": "labextension",
            "dest": "chemiscope-widget",
        }
    ]


def _jupyter_nbextension_paths():
    """Called by Jupyter Notebook Server to detect if it is a valid nbextension and
    to install the widget
    Returns
    =======
    section: The section of the Jupyter Notebook Server to change.
        Must be 'notebook' for widget extensions
    src: Source directory name to copy files from. Webpack outputs generated files
        into this directory and Jupyter Notebook copies from this directory during
        widget installation
    dest: Destination directory name to install widget files to. Jupyter Notebook copies
        from `src` directory into <jupyter path>/nbextensions/<dest> directory
        during widget installation
    require: Path to importable AMD Javascript module inside the
        <jupyter path>/nbextensions/<dest> directory
    """
    print("_jupyter_nbextension_paths called")
    return [
        {
            "section": "notebook",
            "src": "nbextension",
            "dest": "chemiscope-widget",
            "require": "chemiscope-widget/extension",
        }
    ]
