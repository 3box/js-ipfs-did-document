# js-ipfs-did-document
This is a module for creating ipfs based DID Documents. The CID of the first document created will become the identifier of the DID. Any subsequent updates to a DID document will link back to the previous document CID. In order to create a complete DID Method this module needs to be paired with a *revocation module* that handles revocation and rotation of keys.

## Install
Using npm:
```sh
$ npm install ipfs-did-document
```

## API

