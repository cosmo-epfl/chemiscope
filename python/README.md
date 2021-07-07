# chemiscope Python package

This package contains Python code to help generate input files for the
[chemiscope](https://chemiscope.org) default visualizer.

## Installation

You should use pip to install this package:

```bash
pip install chemiscope
```

This installs both a `chemiscope-input` command line tool, and the `chemiscope`
package.

## Usage

From your own code:

```python
import chemiscope

# read frames using ase
frames = ...

# add additional properties for structures (one per structure)

properties = {
    "<name>": {
        target: "structure",
        values: [3, 4, 2, 8, 9, 10],
    }
}

# ... and for atom-centered properties 
properties = properties.update({
    "<name>": {
        target: "atom",
        values: [3, 2, 3, 10],
    }
})

# if you have atom properties you also need to specify which atoms
# indices these properties refer to

centers = [(0,2), (1,12), (1,18), (5, 7)]


chemiscope.write_input("my-input.json.gz", frames, 
           extra=properties, centers=centers)
```
