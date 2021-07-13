#!/usr/bin/env python3
from setuptools import setup
import json
import os

# TODO: build the javascript code when creating a sdist

if __name__ == "__main__":
    # get the version directly from the package.json file
    package_json = os.path.join(os.path.dirname(__file__), "package.json")
    version = json.load(open(package_json))["version"]
    setup(
        version=version,
        data_files=[
            # like `jupyter nbextension install --sys-prefix`
            (
                "share/jupyter/nbextensions/chemiscope-widget",
                [
                    "chemiscope/nbextension/extension.js",
                    "chemiscope/nbextension/chemiscope-widget.min.js",
                ],
            ),
            # like `jupyter nbextension enable --sys-prefix`
            (
                "etc/jupyter/nbconfig/notebook.d",
                ["chemiscope/nbextension/chemiscope-widget.json"],
            ),
        ],
    )
