const IPFS = require('ipfs')
const CID = require('cids')
const MockDate = require('mockdate')
const DidDocument = require('../index')

const INIT_DATE = 1546072635723
MockDate.set(INIT_DATE)

const EXP_DAG_OBJ_1_CONTENT = { '@context': 'https://w3id.org/did/v1', 'authentication': [{ 'publicKey': 'did:muport:GENESIS#key2', 'type': 'Secp256k1SignatureAuthentication2018' }], 'created': '2018-12-29T08:37:15.723Z', 'id': 'did:muport:GENESIS', 'publicKeys': [{ 'id': 'did:muport:GENESIS#key2', 'publicKeyHex': '02b97c30de767f084ce3080168ee293053ba33b235d7116a3263d29f1450936b71', 'type': 'Secp256k1VerificationKey2018' }], 'revocationMethod': { 'contractAddress': '0x1b2d...', 'type': 'ethereumPublishAndRevokeTo' }, 'service': [{ 'id': 'did:muport:GENESIS;openid', 'serviceEndpoint': 'https://openid.example.com/', 'type': 'OpenIdConnectVersion1.0Service' }] }
const EXP_DAG_OBJ_1_DOCUMENT = { '@context': 'https://w3id.org/did/v1', 'authentication': [{ 'publicKey': 'did:muport:zBwWX7PX6XiJB4PakHkkhs17EfRKUaX7NKADY4qBdEWbUJaNiGJq71uww5MMYB8Poej1ZALRPh3ekXPNBVfAs4XRU6ibJ#key2', 'type': 'Secp256k1SignatureAuthentication2018' }], 'created': '2018-12-29T08:37:15.723Z', 'id': 'did:muport:zBwWX7PX6XiJB4PakHkkhs17EfRKUaX7NKADY4qBdEWbUJaNiGJq71uww5MMYB8Poej1ZALRPh3ekXPNBVfAs4XRU6ibJ', 'publicKeys': [{ 'id': 'did:muport:zBwWX7PX6XiJB4PakHkkhs17EfRKUaX7NKADY4qBdEWbUJaNiGJq71uww5MMYB8Poej1ZALRPh3ekXPNBVfAs4XRU6ibJ#key2', 'publicKeyHex': '02b97c30de767f084ce3080168ee293053ba33b235d7116a3263d29f1450936b71', 'type': 'Secp256k1VerificationKey2018' }], 'revocationMethod': { 'contractAddress': '0x1b2d...', 'type': 'ethereumPublishAndRevokeTo' }, 'service': [{ 'id': 'did:muport:zBwWX7PX6XiJB4PakHkkhs17EfRKUaX7NKADY4qBdEWbUJaNiGJq71uww5MMYB8Poej1ZALRPh3ekXPNBVfAs4XRU6ibJ;openid', 'serviceEndpoint': 'https://openid.example.com/', 'type': 'OpenIdConnectVersion1.0Service' }] }
const EXP_DAG_OBJ_2_CONTENT = { '@context': 'https://w3id.org/did/v1', 'authentication': [{ 'publicKey': 'did:muport:zBwWX7PX6XiJB4PakHkkhs17EfRKUaX7NKADY4qBdEWbUJaNiGJq71uww5MMYB8Poej1ZALRPh3ekXPNBVfAs4XRU6ibJ#key2', 'type': 'Secp256k1SignatureAuthentication2018' }], 'created': '2018-12-29T08:37:15.723Z', 'id': 'did:muport:zBwWX7PX6XiJB4PakHkkhs17EfRKUaX7NKADY4qBdEWbUJaNiGJq71uww5MMYB8Poej1ZALRPh3ekXPNBVfAs4XRU6ibJ', 'publicKeys': [{ 'id': 'did:muport:zBwWX7PX6XiJB4PakHkkhs17EfRKUaX7NKADY4qBdEWbUJaNiGJq71uww5MMYB8Poej1ZALRPh3ekXPNBVfAs4XRU6ibJ#key2', 'publicKeyHex': '02b97c30de767f084ce3080168ee293053ba33b235d7116a3263d29f1450936b71', 'type': 'Secp256k1VerificationKey2018' }], 'revocationMethod': { 'contractAddress': '0x1b2d...', 'type': 'ethereumPublishAndRevokeTo' }, 'previousDocument': 'zBwWX7PX6XiJB4PakHkkhs17EfRKUaX7NKADY4qBdEWbUJaNiGJq71uww5MMYB8Poej1ZALRPh3ekXPNBVfAs4XRU6ibJ', 'updated': '2018-12-29T08:37:25.723Z' }

describe('DidDoc', () => {
  let ipfs
  let doc

  beforeAll(async () => {
    ipfs = await initIPFS()
  })

  describe('create new document', () => {
    it('creates an empty document', () => {
      doc = new DidDocument(ipfs, 'muport')
      expect(doc._content.id).toEqual('did:muport:GENESIS')
    })

    it('adds and removes publicKeys correctly', () => {
      doc.addPublicKey('key1', 'RsaVerificationKey2018', 'publicKeyPem', '-----BEGIN PUBLIC KEY...END PUBLIC KEY-----\r\n', 'did:muport:someCid')
      doc.addPublicKey('key2', 'Secp256k1VerificationKey2018', 'publicKeyHex', '02b97c30de767f084ce3080168ee293053ba33b235d7116a3263d29f1450936b71')
      expect(doc._content.publicKeys).toEqual([{ 'id': 'did:muport:GENESIS#key1', 'owner': 'did:muport:someCid', 'publicKeyPem': '-----BEGIN PUBLIC KEY...END PUBLIC KEY-----\r\n', 'type': 'RsaVerificationKey2018' }, { 'id': 'did:muport:GENESIS#key2', 'publicKeyHex': '02b97c30de767f084ce3080168ee293053ba33b235d7116a3263d29f1450936b71', 'type': 'Secp256k1VerificationKey2018' }])
      doc.removePublicKey('key1')
      expect(doc._content.publicKeys).toEqual([{ 'id': 'did:muport:GENESIS#key2', 'publicKeyHex': '02b97c30de767f084ce3080168ee293053ba33b235d7116a3263d29f1450936b71', 'type': 'Secp256k1VerificationKey2018' }])
    })

    it('adds and removes authentications correctly', () => {
      doc.addAuthentication('RsaSignatureAuthentication2018', 'key1')
      doc.addAuthentication('Secp256k1SignatureAuthentication2018', 'key2')
      expect(doc._content.authentication).toEqual([{ 'publicKey': 'did:muport:GENESIS#key1', 'type': 'RsaSignatureAuthentication2018' }, { 'publicKey': 'did:muport:GENESIS#key2', 'type': 'Secp256k1SignatureAuthentication2018' }])
      doc.removeAuthentication('key1')
      expect(doc._content.authentication).toEqual([{ 'publicKey': 'did:muport:GENESIS#key2', 'type': 'Secp256k1SignatureAuthentication2018' }])
    })

    it('adds and removes services correctly', () => {
      doc.addService('openid', 'OpenIdConnectVersion1.0Service', 'https://openid.example.com/')
      doc.addService('inbox', 'SocialWebInboxService', 'https://social.example.com/83hfh37dj', { description: 'My public social inbox', spamCost: { amount: '0.50', currency: 'USD' } })
      expect(doc._content.service).toEqual([{ 'id': 'did:muport:GENESIS;openid', 'serviceEndpoint': 'https://openid.example.com/', 'type': 'OpenIdConnectVersion1.0Service' }, { 'description': 'My public social inbox', 'id': 'did:muport:GENESIS;inbox', 'serviceEndpoint': 'https://social.example.com/83hfh37dj', 'spamCost': { 'amount': '0.50', 'currency': 'USD' }, 'type': 'SocialWebInboxService' }])
      doc.removeService('inbox')
      expect(doc._content.service).toEqual([{ 'id': 'did:muport:GENESIS;openid', 'serviceEndpoint': 'https://openid.example.com/', 'type': 'OpenIdConnectVersion1.0Service' }])
    })

    it('sets revocationMethod correctly', () => {
      const method = {
        type: 'ethereumPublishAndRevokeTo',
        contractAddress: '0x1b2d...'
      }
      doc.setRevocationMethod(method)
      expect(doc._content.revocationMethod).toEqual(method)
    })

    it('creates document correctly on commit', async () => {
      const cid = await doc.commit()
      expect(CID.isCID(cid)).toBeTruthy()
      expect((await ipfs.dag.get(cid)).value).toEqual(EXP_DAG_OBJ_1_CONTENT)
      expect(await DidDocument.cidToDocument(ipfs, cid)).toEqual(EXP_DAG_OBJ_1_DOCUMENT)
      expect(doc._content).toEqual(Object.assign(EXP_DAG_OBJ_1_DOCUMENT, { previousDocument: cid.toString() }))
    })
  })

  describe('update document', () => {
    it('loads document correctly from hash', async () => {
      const cid = doc._content.id.split(':')[2]
      doc = await DidDocument.load(ipfs, cid)
      expect(doc._content).toEqual(Object.assign(EXP_DAG_OBJ_1_DOCUMENT, { previousDocument: cid }))
    })

    it('updates entries correctly', async () => {
      doc.removePublicKey('key2')
      doc.removeAuthentication('key2')
      doc.removeService('openid')
      expect(doc._content.publicKeys).toEqual()
      expect(doc._content.authentication).toEqual()
      expect(doc._content.service).toEqual()

      doc.addPublicKey('key2', 'Secp256k1VerificationKey2018', 'publicKeyHex', '02b97c30de767f084ce3080168ee293053ba33b235d7116a3263d29f1450936b71')
      doc.addAuthentication('Secp256k1SignatureAuthentication2018', 'key2')
      expect(doc._content.publicKeys).toEqual([{ 'id': 'did:muport:zBwWX7PX6XiJB4PakHkkhs17EfRKUaX7NKADY4qBdEWbUJaNiGJq71uww5MMYB8Poej1ZALRPh3ekXPNBVfAs4XRU6ibJ#key2', 'publicKeyHex': '02b97c30de767f084ce3080168ee293053ba33b235d7116a3263d29f1450936b71', 'type': 'Secp256k1VerificationKey2018' }])
      expect(doc._content.authentication).toEqual([{ 'publicKey': 'did:muport:zBwWX7PX6XiJB4PakHkkhs17EfRKUaX7NKADY4qBdEWbUJaNiGJq71uww5MMYB8Poej1ZALRPh3ekXPNBVfAs4XRU6ibJ#key2', 'type': 'Secp256k1SignatureAuthentication2018' }])
    })

    it('creates document correctly on commit', async () => {
      MockDate.set(INIT_DATE + 10000)
      const cid = await doc.commit()
      expect(CID.isCID(cid)).toBeTruthy()
      expect((await ipfs.dag.get(cid)).value).toEqual(EXP_DAG_OBJ_2_CONTENT)
      expect(await DidDocument.cidToDocument(ipfs, cid)).toEqual(EXP_DAG_OBJ_2_CONTENT)
    })
  })

  afterAll(async () => {
    await ipfs.stop()
  })
})

const initIPFS = async () => {
  return new Promise((resolve, reject) => {
    let ipfs = new IPFS({
      repo: './.ipfs',
      config: { Addresses: {}, Discovery: {}, Bootstrap: [] }
    })
    ipfs.on('error', reject)
    ipfs.on('ready', () => resolve(ipfs))
  })
}
