# Client Password Hash

### clientPassProtect(password, [options:{ rounds: [default:250000] }])

```js
const clientPassProtect = require('client-pass-protect')

clientPassProtect('Password')
// 223877dea5825cdf8d51bef3be3ffc3ebc03cc9a473a83384553dd8efe1d860a

clientPassProtect('Password', {
    rounds: 500000
})
// 7211cd21c8e5e2ac4b73988b31afa66b9624d7aff7c3f088a1cd2f054c57b5ca
```