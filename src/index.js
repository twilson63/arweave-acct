export const getAccount = address =>
  fetch('https://arweave.net/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `
query {
  transactions(
    owners: ["${address}"], 
    tags: {
      name: "Protocol-Name"
      values:["Account-0.2"]
    }
  ) {
    edges {
      node {
        id
      }
    }
  }
}
      `
    })
  })
    .then(res => res.json())
    .then(result => result.data.transactions.edges[0].node.id)
    .then(tx => fetch(`https://arweave.net/${tx}`).then(res => res.json()))
    .catch(err => {
      console.log(err)
      return { tags: [{ name: 'handle', value: 'unknown' }] }
    })