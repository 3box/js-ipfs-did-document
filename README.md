# js-ipfs-did-document
This is a module for creating ipfs based DID Documents. The CID of the first document created will become the identifier of the DID. Any subsequent updates to a DID document will link back to the previous document CID. In order to create a complete DID Method this module needs to be paired with a *revocation module* that handles revocation and rotation of keys.

## Install
Using npm:
```sh
$ npm install ipfs-did-document
```

## API

<a name="DidDocument"></a>

### DidDocument
A class for creating ipfs based DID Documents.
Based on the DID spec: https://w3c-ccg.github.io/did-spec/

**Kind**: global class  

* [DidDocument](#DidDocument)
    * [new DidDocument(ipfs, method)](#new_DidDocument_new)
    * _instance_
        * [.addPublicKey(id, type, encoding, key, owner)](#DidDocument+addPublicKey)
        * [.removePublicKey(id)](#DidDocument+removePublicKey)
        * [.addAuthentication(type, id)](#DidDocument+addAuthentication)
        * [.removeAuthentication(id)](#DidDocument+removeAuthentication)
        * [.addService(id, type, serviceEndpoint, additionalFields)](#DidDocument+addService)
        * [.removeService(id)](#DidDocument+removeService)
        * [.setRevocationMethod(methodDescriptor)](#DidDocument+setRevocationMethod)
        * [.addCustomProperty(propName, propValue)](#DidDocument+addCustomProperty)
        * [.removeCustomProperty(propName)](#DidDocument+removeCustomProperty)
        * [.commit()](#DidDocument+commit) ⇒ <code>Promise.&lt;CID&gt;</code>
    * _static_
        * [.load(ipfs, documentCid)](#DidDocument.load) ⇒ [<code>Promise.&lt;DidDocument&gt;</code>](#DidDocument)
        * [.cidToDocument(ipfs, documentCid)](#DidDocument.cidToDocument) ⇒ <code>Promise.&lt;Object&gt;</code>

<a name="new_DidDocument_new"></a>

#### new DidDocument(ipfs, method)
Create a new DID Document.


| Param | Type | Description |
| --- | --- | --- |
| ipfs | <code>Object</code> | An js-ipfs instance |
| method | <code>String</code> | The name of the DID Method |

<a name="DidDocument+addPublicKey"></a>

#### didDocument.addPublicKey(id, type, encoding, key, owner)
Add a new public key

**Kind**: instance method of [<code>DidDocument</code>](#DidDocument)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The id of the key, e.g. "key1" |
| type | <code>String</code> | The type of the key |
| encoding | <code>String</code> | The encoding of the key |
| key | <code>String</code> | The encoded public key |
| owner | <code>String</code> | The owner of the key (optional) |

<a name="DidDocument+removePublicKey"></a>

#### didDocument.removePublicKey(id)
Remove a public key

**Kind**: instance method of [<code>DidDocument</code>](#DidDocument)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The id of the key, e.g. "key1" |

<a name="DidDocument+addAuthentication"></a>

#### didDocument.addAuthentication(type, id)
Add a new authentication

**Kind**: instance method of [<code>DidDocument</code>](#DidDocument)  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>String</code> | The type of the authentication |
| id | <code>String</code> | The id of the key to be used, e.g. "key1" |

<a name="DidDocument+removeAuthentication"></a>

#### didDocument.removeAuthentication(id)
Remove an authentication

**Kind**: instance method of [<code>DidDocument</code>](#DidDocument)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The id of the key, e.g. "key1" |

<a name="DidDocument+addService"></a>

#### didDocument.addService(id, type, serviceEndpoint, additionalFields)
Add a new service

**Kind**: instance method of [<code>DidDocument</code>](#DidDocument)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The id of the key to be used, e.g. "key1" |
| type | <code>String</code> | The type of the service |
| serviceEndpoint | <code>String</code> | The endpoint of the service |
| additionalFields | <code>Object</code> | Any additional fields (optional) |

<a name="DidDocument+removeService"></a>

#### didDocument.removeService(id)
Remove a service

**Kind**: instance method of [<code>DidDocument</code>](#DidDocument)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The id of the key, e.g. "key1" |

<a name="DidDocument+setRevocationMethod"></a>

#### didDocument.setRevocationMethod(methodDescriptor)
Set the revocationMethod. This can be of any js object
and is determined by the implementer of a revocation module.

**Kind**: instance method of [<code>DidDocument</code>](#DidDocument)  

| Param | Type | Description |
| --- | --- | --- |
| methodDescriptor | <code>Object</code> | the object that defines the revocation method |

<a name="DidDocument+addCustomProperty"></a>

#### didDocument.addCustomProperty(propName, propValue)
Add a new property

**Kind**: instance method of [<code>DidDocument</code>](#DidDocument)  

| Param | Type | Description |
| --- | --- | --- |
| propName | <code>String</code> | The name of the property |
| propValue | <code>Object</code> | The value of the property |

<a name="DidDocument+removeCustomProperty"></a>

#### didDocument.removeCustomProperty(propName)
Remove a property

**Kind**: instance method of [<code>DidDocument</code>](#DidDocument)  

| Param | Type | Description |
| --- | --- | --- |
| propName | <code>String</code> | The name of the property |

<a name="DidDocument+commit"></a>

#### didDocument.commit() ⇒ <code>Promise.&lt;CID&gt;</code>
Commit all changes and create a new ipfs dag object.

**Kind**: instance method of [<code>DidDocument</code>](#DidDocument)  
**Returns**: <code>Promise.&lt;CID&gt;</code> - The CID of the object  
<a name="DidDocument.load"></a>

#### DidDocument.load(ipfs, documentCid) ⇒ [<code>Promise.&lt;DidDocument&gt;</code>](#DidDocument)
Load an already existing DID Document.

**Kind**: static method of [<code>DidDocument</code>](#DidDocument)  
**Returns**: [<code>Promise.&lt;DidDocument&gt;</code>](#DidDocument) - self  

| Param | Type | Description |
| --- | --- | --- |
| ipfs | <code>Object</code> | An js-ipfs instance |
| documentCid | <code>String</code> | The CID of the document |

<a name="DidDocument.cidToDocument"></a>

#### DidDocument.cidToDocument(ipfs, documentCid) ⇒ <code>Promise.&lt;Object&gt;</code>
Returns the DID document of a document CID

**Kind**: static method of [<code>DidDocument</code>](#DidDocument)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - The DID document as a js object  

| Param | Type | Description |
| --- | --- | --- |
| ipfs | <code>Object</code> | An js-ipfs instance |
| documentCid | <code>String</code> | The CID of the document |

