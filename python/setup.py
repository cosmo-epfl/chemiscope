#!/usr/bin/env python3
from setuptools import setup
import json
import os

# TODO: build the javascript code when creating a sdist


def read_version_from_package_json():
    """get the version number directly from the package.json file"""
    package_json = os.path.join(os.path.dirname(__file__), "package.json")
    if os.path.islink(package_json):
        # unix, symlink exists
        with open(package_json) as fd:
            return json.load(fd)["version"]
    else:
        # windows, git represent symlinks as file containing the actual path
        with open(package_json) as fd:
            package_json_path = fd.read().strip()

        package_json_path = os.path.join(
            os.path.dirname(package_json), package_json_path
        )
        with open(package_json_path) as fd:
            return json.load(fd)["version"]


if __name__ == "__main__":
    setup(
        version=read_version_from_package_json(),
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
