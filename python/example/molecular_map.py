import numpy as np
from ase.io import read, write
from rascal.representations import SphericalInvariants
from rascal.neighbourlist.structure_manager import mask_center_atoms_by_species
from sklearn.decomposition import PCA
from chemiscope import write_input, create_input

import urllib.request
url = 'https://raw.githubusercontent.com/cosmo-epfl/librascal-example-data/833b4336a7daf471e16993158322b3ea807b9d3f/inputs/molecule_conformers_dftb.xyz'
# Download the file from `url`, save it in a temporary directory and get the
# path to it (e.g. '/tmp/tmpb48zma.txt') in the `structures_fn` variable:
structures_fn, headers = urllib.request.urlretrieve(url)

frames = read(structures_fn,'::10')

atidx = []
nidx = []
for f in frames:
    mask_center_atoms_by_species(f, [6,8])
    # indices of the active points
    atidx.append(np.where(f.numbers > 1)[0])
    nidx.append(len(atidx[-1]))

hypers = {
    "soap_type" : "PowerSpectrum",
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

idx = 0
str_feats = np.zeros((len(nidx), env_feats.shape[1]))
for i, n in enumerate(nidx):    
    str_feats[i] = np.mean(env_feats[idx:idx+n], axis=0)
    idx+=n

env_pca = PCA(n_components=2).fit_transform(env_feats)
str_pca = PCA(n_components=2).fit_transform(str_feats)

idx = 0
for i, f in enumerate(frames):
    f.info["pca1"] = str_pca[i,0]
    f.info["pca2"] = str_pca[i,1]
    f.arrays["pca1"] = np.zeros(len(f.numbers))
    f.arrays["pca2"] = np.zeros(len(f.numbers))
    f.arrays["pca1"][atidx[i]] = env_pca[idx:idx+nidx[i],0]
    f.arrays["pca2"][atidx[i]] = env_pca[idx:idx+nidx[i],1]
    idx+=nidx[i]

write_input("chemiscope.json", frames=frames, meta=dict(name='C3OH6'))
