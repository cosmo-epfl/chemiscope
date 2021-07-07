"""
A simple demonstration of the construction of a PCA map based on SOAP
features computed by librascal, and exported as a chemiscope json.
"""

import numpy as np
from ase.io import read, write
from rascal.representations import SphericalInvariants
from rascal.neighbourlist.structure_manager import mask_center_atoms_by_species
from sklearn.decomposition import PCA
from chemiscope import write_input, create_input

import urllib.request

# fetch structures from a rascal examples repo
url = "https://raw.githubusercontent.com/cosmo-epfl/librascal-example-data/833b4336a7daf471e16993158322b3ea807b9d3f/inputs/molecule_conformers_dftb.xyz"
structures_fn, headers = urllib.request.urlretrieve(url)

frames = read(structures_fn, "::10")

# uses only C and O atoms as active centers
# this creates a property array that is also used by chemiscope write_input
atidx = []
nidx = []
for f in frames:
    mask_center_atoms_by_species(f, [6, 8])
    # indices of the active points
    atidx.append(np.where(f.numbers > 1)[0])
    nidx.append(len(atidx[-1]))

# compute SOAP features
hypers = {
    "soap_type": "PowerSpectrum",
    "interaction_cutoff": 3,
    "max_radial": 8,
    "max_angular": 6,
    "gaussian_sigma_constant": 0.3,
    "gaussian_sigma_type": "Constant",
    "cutoff_smooth_width": 0.5,
    "radial_basis": "GTO",
}

spinv = SphericalInvariants(**hypers)
env_feats = spinv.transform(frames).get_features(spinv)

# structure features are just the mean over the environments in each structure
idx = 0
str_feats = np.zeros((len(nidx), env_feats.shape[1]))
for i, n in enumerate(nidx):
    str_feats[i] = np.mean(env_feats[idx : idx + n], axis=0)
    idx += n

# dimensionality reduction can't get more basic than this
env_pca = PCA(n_components=2).fit_transform(env_feats)
str_pca = PCA(n_components=2).fit_transform(str_feats)

# stores in ASE frame fields, which will then be converted by write_chemiscope
# it'd also be possible to use and explicit declaration of properties
idx = 0
for i, f in enumerate(frames):
    f.info["pca1"] = str_pca[i, 0]
    f.info["pca2"] = str_pca[i, 1]
    f.arrays["env_pca1"] = np.zeros(len(f.numbers))
    f.arrays["env_pca2"] = np.zeros(len(f.numbers))
    f.arrays["env_pca1"][atidx[i]] = env_pca[idx : idx + nidx[i], 0]
    f.arrays["env_pca2"][atidx[i]] = env_pca[idx : idx + nidx[i], 1]
    idx += nidx[i]

write_input("chemiscope.json", frames=frames, meta=dict(name="C3OH6"))
